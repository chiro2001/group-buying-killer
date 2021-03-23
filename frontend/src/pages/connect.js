import React from "react"
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { API, test } from "../api/api"
const QRCode = require('qrcode.react');

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.api = new API();
    this.url = window.location.protocol + "//" + window.location.host + '/';
    this.state = {
      qrcodeWidth: window.innerWidth * 0.5 < 250 ? window.innerWidth * 0.5 : 250,
    };
    window.addEventListener("resize", () => { this.setState({ qrcodeWidth: window.innerWidth * 0.5 < 250 ? window.innerWidth * 0.5 : 250 }); })
  }
  render() {
    let { config } = this.props;
    return (<Container size="xs">
      连接手机
      <Button variant="contained" color="secondary" onClick={() => {
        console.log("api:", this.api);
        console.log('test', test);
        // api.test();
        (async () => {
          console.log(await test());
          console.log(await this.api.test());
        })();
      }}>
        测试连接
      </Button>
      <QRCode value={this.url} size={this.state.qrcodeWidth} />
    </Container>)
  }
};

export default Connect;