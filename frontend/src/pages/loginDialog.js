import React from 'react'
import Container from '@material-ui/core/Container';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import Login from "./login"
import { setConfig } from "../data/action"

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: "20%",
    marginBottom: "20%"
  }
}));

function LoginDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  let { config } = props;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>账户登录</DialogTitle>
      <Divider></Divider>
      <Container size="sm" className={classes.content}>
        <Login config={config}></Login>
      </Container>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
};

export default LoginDialog;