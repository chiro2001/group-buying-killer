import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { setConfig } from "../data/action"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
  }
  render() {
    let { config } = this.props;
    return (<Container size="sm">
      <Typography variant="body1">请在弹出的窗口中完成登录</Typography>
    </Container>)
  }
};

export default Login;