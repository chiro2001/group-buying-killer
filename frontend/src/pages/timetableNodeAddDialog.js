import React from 'react'
import Container from '@material-ui/core/Container';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import { setConfig } from "../data/action"
import TimetableNodeList from '../components/timetableNodeList';
import { DialogContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: "20%",
    marginBottom: "20%"
  }
}));

function TimetableNodeAddDialog(props) {
  const classes = useStyles();
  const { onClose, open, config } = props;

  const handleClose = () => {
    if (onClose)
      onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>添加一个时间点</DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <TimetableNodeList config={config} onClose={n => {
          console.log(n);
          onClose();
        }} node={{}} />
      </DialogContent>
    </Dialog>
  );
}

TimetableNodeAddDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
};

export default TimetableNodeAddDialog;