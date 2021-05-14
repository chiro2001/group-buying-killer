import React from 'react';
import { TextField, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { parseTimePoint, parseTimePeriod, sleep } from '../utils/utils'
import TimetablePeriodList from './timetablePeriodList';
import { API } from '../api/api';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  secondaryIcon: {
    // paddingRight: theme.spacing(4),
  }
}));

const api = new API();

function TimetablePeriod(props) {
  const classes = useStyles();
  const { period, onClose } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const getSecondaryText = () => {
    return `${period.periodId}/${period.roomItem.roomType}/调整至:${period.price}/下次调整:${parseTimePoint(period.time_start)}/下次调整结束:${parseTimePoint(period.time_end)}/周期:${period.cycle > 0 ? parseTimePeriod(period.cycle) : "单次"}/${period.avaliable ? "可用" : "不可用"}`
  };
  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><AlarmOnIcon /></ListItemIcon>
        <ListItemText primary={period.itemName} secondary={getSecondaryText()} />
        <div className={classes.secondaryIcon}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={async () => {
            if (period.tid) await api.delete_tid(period.tid);
          }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TimetablePeriodList roomItemNow={period.roomItem} period={period} onClose={period => {
          console.log('onClose', period);
          if (onClose) onClose();
          setOpen(false);
        }} />
      </Collapse>
    </div>
  );
}

TimetablePeriod.propTypes = {
  period: PropTypes.object.isRequired,
  onClose: PropTypes.func
};

export default TimetablePeriod;