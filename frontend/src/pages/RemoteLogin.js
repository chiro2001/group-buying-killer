import { Box, Container, Paper } from '@material-ui/core';
import React from 'react';
import { api } from '../api/api';
import { WebSocketAPI } from '../api/remote_login';
import { setConfig, setDaemon } from '../data/action';
import store from '../data/store';
const QRCode = require('qrcode.react');

function CenterBox(props) {
  const { children } = props;
  return <Box style={{ width: '100%', height: '100%', display: "flex", justifyContent: "center", flexDirection: "column" }}><Box style={{ width: '100%', textAlign: "center" }}>{children}</Box></Box>;
}

export default class RemoteLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      loginDone: false
    };
    this.ws_api = null;
    // this.unsubscribe = store.subscribe(async () => {
    //   if (this.loginDone) return;
    //   let state = store.getState();
    //   if (state.daemon) {
    //     this.setState({ loginDone: true });
    //     if (this.ws_api) this.ws_api.close();
    //   }
    // });
    setTimeout(async () => {
      if (store.getState().daemon || this.state.loginDone) return;
      const res = await api.request('remote_login', "PATCH");
      if (store.getState().daemon || this.state.loginDone) return;
      const server = res.data.server;
      let config = store.getState().config;
      config.data.remote_login.server = server;
      store.dispatch(setConfig(config));
      if (store.getState().daemon || this.state.loginDone) return;
      this.ws_api = new WebSocketAPI(server);
      this.ws_api.oncode = code => {
        // console.log('code', code);
        if (store.getState().daemon || this.state.loginDone) return;
        this.setState({ code });
      };
      this.ws_api.oncookies = async cookies => {
        const resp = await api.request('remote_login', "POST", { cookies });
        console.log('done', resp);
        if (store.getState().daemon || this.state.loginDone) return;
        this.setState({ loginDone: true });
        const daemon = await api.request('remote_login', 'GET');
        if (daemon.code === 200 && daemon.data.uid) {
          store.dispatch(setDaemon(daemon.data));
        }
      }
      if (store.getState().daemon || this.state.loginDone) return;
      this.ws_api.connect();
    }, 1000);
  }
  componentWillUnmount() {
    if (this.ws_api) this.ws_api.close();
    // this.unsubscribe();
  }
  render() {
    let content = null;
    if (this.state.loginDone) {
      content = <Paper style={{ width: 200, height: 200 }}>
        <CenterBox>登录完成</CenterBox>
      </Paper>;
    } else {
      content = this.state.code ? <QRCode value={JSON.stringify(this.state.code)} size={200} /> : <Paper style={{ width: 200, height: 200 }}>
        <CenterBox>正在加载二维码...</CenterBox>
      </Paper>;
    }
    return (<Container>
      {content}
    </Container>);
  }
}