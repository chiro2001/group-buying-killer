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
import RoomStockPlanList from './roomStockPlanList';
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

function RoomStockPlan(props) {
  const classes = useStyles();
  const { stock, onClose } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const planTypeName = {
    'lt': "小于", "le": "小于等于", 'gt': '大于', 'ge': '大约等于'
  };
  const getSecondaryText = () => {
    return `${stock.roomItem.roomType}/库存${planTypeName[stock.planType]}${stock.value}/调整至:${stock.price}/下次调整:${parseTimePoint(stock.time_)}/周期:${stock.cycle > 0 ? parseTimePeriod(stock.cycle) : "单次"}/${(stock.avaliable !== false) ? "可用" : "不可用"}`
  };
  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><AlarmOnIcon /></ListItemIcon>
        <ListItemText primary={stock.itemName} secondary={getSecondaryText()} />
        <div className={classes.secondaryIcon}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={async () => {
            if (stock.tid) await api.delete_tid(stock.tid);
          }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <RoomStockPlanList roomItemNow={stock.roomItem} stock={stock} onClose={stock => {
          console.log('onClose', stock, onClose);
          setOpen(false);
          if (onClose) onClose();
        }} />
      </Collapse>
    </div>
  );
}

RoomStockPlan.propTypes = {
  stock: PropTypes.object.isRequired,
  onClose: PropTypes.func
};

export default RoomStockPlan;