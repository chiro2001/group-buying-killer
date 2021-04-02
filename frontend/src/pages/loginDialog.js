import React from 'react'
import Container from '@material-ui/core/Container';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent } from '@material-ui/core';
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
  const { onClose, open } = props;

  const handleClose = () => {
    if (onClose)
      onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>账户登录</DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <Login></Login>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default LoginDialog;