import React from "react"
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Config from "./Config"
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.render = this.render.bind(this);
    this.config = new Config();

    this.state = {
      openDrawer: false,
    };

    console.log(this.config);
    console.log(this.config.theme);

  }

  render() {
    return (<div>
      <ThemeProvider theme={this.config.theme}>
        <Router>
          <Switch>
            <Route path={"/"} exact={true}>
              <Container maxWidth="ms">
                <p>主页</p>
              </Container>
            </Route>
            <Route path={"/test"} exact={false}>
              <Container maxWidth="ms">
                <p>测试</p>
              </Container>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div >)
  }
};

export default App;