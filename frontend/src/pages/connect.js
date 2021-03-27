import React from "react"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LinkText from '@material-ui/core/Link';
import { ListItem, ListItemText, List } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { API, test } from "../api/api"
const QRCode = require('qrcode.react');

class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.api = new API();
    this.state = {
      qrcodeWidth: window.innerWidth * 0.5 < 250 ? window.innerWidth * 0.5 : 250,
      ips: [],
      url: window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/',
    };
    window.addEventListener("resize", () => { this.setState({ qrcodeWidth: window.innerWidth * 0.5 < 250 ? window.innerWidth * 0.5 : 250 }); })
    this.api.get_ips().then(ips => {
      console.log('ips', ips);
      this.setState({ ips: ips });
      if (ips.length > 0) this.setState({ url: window.location.protocol + "//" + ips[0] + ":" + window.location.port + '/' });
    })
  }
  render() {
    let { config } = this.props;
    return (<Container size="xs">
      <Typography variant="body1">请在下面选择一个可能的IP地址，然后扫码连接。</Typography>
      <List>
        {this.state.ips.map(ip =>
          <ListItem button key={ip} onClick={() => {
            this.setState({ url: window.location.protocol + "//" + ip + ":" + window.location.port + '/' });
          }}>
            <ListItemText primary={ip} />
          </ListItem>
        )}
      </List>
      <QRCode value={this.state.url} size={this.state.qrcodeWidth} />
      <Typography variant="body1">或者打开：<LinkText href={this.state.url}>{this.state.url}</LinkText></Typography>
    </Container >)
  }
};

export default Connect;