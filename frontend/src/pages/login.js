import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { setConfig } from "../data/action";
import { Button } from '@material-ui/core';
import { API } from "../api/api";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.state = {
      has_login: true
    };
    this.api = new API();
  }
  render() {
    let { config } = this.props;
    return (<Container size="sm">
      <Typography variant="body1">{this.state.has_login ? "点击“重新登录”会清除后台登录信息，是否继续？" : "请在稍后弹出的窗口中完成登录"}</Typography>
      <Button variant="contained" onClick={() => {
        this.api.logout();
        this.setState({ has_login: false });
      }}>重新登录</Button>
    </Container >)
  }
};

export default Login;