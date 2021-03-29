import React from 'react';
import { TextField, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@material-ui/pickers';
import { parseTimePoint, parseTimePeriod, sleep } from '../utils/utils';
import TimetableNodeList from '../components/timetableNodeList';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  secondaryIcon: {
    // paddingRight: theme.spacing(4),
  }
}));

function TimetableNode(props) {
  const classes = useStyles();
  const { node, onClose } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const getSecondaryText = () => {
    return `${node.periodId}/调整至:${node.price}/下次调整:${parseTimePoint(node.time_)}/周期:${node.cycle > 0 ? parseTimePeriod(node.cycle) : "单次"}/${node.avaliable ? "可用" : "不可用"}`
  };
  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><AlarmOnIcon /></ListItemIcon>
        <ListItemText primary={node.itemName} secondary={getSecondaryText()} />
        <div className={classes.secondaryIcon}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TimetableNodeList roomItemNow={node.roomItem} node={node} onClose={node => {
          console.log('onClose', node, onClose);
          setOpen(false);
          if (onClose) onClose();
        }} />
      </Collapse>
    </div>
  );
}

TimetableNode.propTypes = {
  node: PropTypes.object.isRequired,
  onClose: PropTypes.func
};

export default TimetableNode;