import React from 'react';
import { TextField, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@material-ui/pickers';
import { parseTimePoint, parseTimePeriod, sleep } from '../utils/utils'
import RoomItemList from './roomItemList';
import { API } from '../api/api';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function RoomStockPlanList(props) {
  const classes = useStyles();
  const { stock, onClose, roomItemNow } = props;
  const [valueValue, setValueValue] = React.useState(stock.value || "");
  const [planType, setPlanType] = React.useState(stock.planType || "lt");
  const planTypeText = [
    ['lt', '小于'], ['le', '小于等于'], ['gt', '大于'], ['ge', '大于等于'],
  ];
  const [selectAvailableStartDate, handleAvailableStrartDateChange] = React.useState(stock.available_start ? stock.available_start : 0);
  const [selectAvailableEndDate, handleAvailableEndDateChange] = React.useState(stock.available_end ? stock.available_end : 0);
  const [selectAvailableStartDateOn, setSelectAvailableStartDateOn] = React.useState(selectAvailableStartDate === 0 ? false : true);
  const [selectAvailableEndDateOn, setSelectAvailableEndDateOn] = React.useState(selectAvailableEndDate === 0 ? false : true);
  const [roomItemListOpen, setRoomItemListOpen] = React.useState(false);
  const [valuePrice, setValuePrice] = React.useState(stock.price ? ('' + stock.price) : (roomItemNow ? ('' + roomItemNow.price) : '0'));
  const [errorMessage, setErrorMessage] = React.useState('');
  // console.log('StockList: roomItenNow = ', roomItemNow);
  return (
    <List component="div" disablePadding className={classes.nested}>
      <ListItem button onClick={() => { setRoomItemListOpen(!roomItemListOpen); }}>
        <ListItemText primary="对应房间项目" />
      </ListItem>
      <Collapse in={roomItemListOpen} timeout="auto" unmountOnExit className={classes.nested}>
        <RoomItemList roomItemNow={roomItemNow} />
      </Collapse>
      <ListItem>
        <ListItemText primary="调整至" />
        <ListItemSecondaryAction>
          <TextField label="输入价格" defaultValue={valuePrice} onChange={(e) => {
            setValuePrice(e.target.value);
          }} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="选择触发类型" />
        <ListItemSecondaryAction>
          <FormControl>
            <InputLabel>触发类型</InputLabel>
            <Select
              value={planType}
              onChange={(e) => { setPlanType(e.target.value); }}
            >
              {planTypeText.map((v, i) => <MenuItem key={i} value={v[0]}>{v[1]}</MenuItem>)}
            </Select>
          </FormControl>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="库存值" />
        <ListItemSecondaryAction>
          <TextField label="和触发类型配合" defaultValue={valueValue} onChange={(e) => {
            setValueValue(e.target.value);
          }} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="生效时间之外项目无效，不设置即全部生效" />
      </ListItem>
      <ListItem>
        <ListItemText primary="设置生效开始时间" />
        <ListItemSecondaryAction>
          {!selectAvailableStartDateOn ?
            <Button onClick={() => { setSelectAvailableStartDateOn(true); }}>点击设置</Button>
            : <DateTimePicker
              value={selectAvailableStartDate}
              onChange={handleAvailableStrartDateChange}
              onClose={async () => {
                await sleep(1200);
                selectAvailableStartDate === 0 ? setSelectAvailableStartDateOn(false) : setSelectAvailableStartDateOn(true);
              }} />}
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="设置生效结束时间" />
        <ListItemSecondaryAction>
          {!selectAvailableEndDateOn ?
            <Button onClick={() => { setSelectAvailableEndDateOn(true); }}>点击设置</Button>
            : <DateTimePicker
              value={selectAvailableEndDate}
              onChange={handleAvailableEndDateChange}
              onClose={async () => {
                await sleep(1200);
                console.log(selectAvailableEndDate);
                selectAvailableEndDate === 0 ? setSelectAvailableEndDateOn(false) : setSelectAvailableEndDateOn(true);
              }} />}
        </ListItemSecondaryAction>
      </ListItem>
      {errorMessage ? <ListItem>
        {/* <ListItemText primary={errorMessage} color="error"></ListItemText> */}
        <Typography color="error">{errorMessage}</Typography>
      </ListItem> : undefined}
      <ListItem>
        <Button variant="contained" fullWidth onClick={() => {
          let n = stock ? stock : {};
          n.available_start = selectAvailableStartDate._d ? selectAvailableStartDate._d.getTime() : selectAvailableStartDate;
          n.available_end = selectAvailableEndDate._d ? selectAvailableEndDate._d.getTime() : selectAvailableEndDate;
          if (n.available_start === 0) delete n.available_start;
          if (n.available_end === 0) delete n.available_end;
          console.log(n);
          if ((n.available_start && !n.available_end) || (!n.available_start && n.available_end)) {
            setErrorMessage('可用开始时间和结束时间不能只选择其中之一');
            return;
          }
          n.price = valuePrice;
          n.value = valueValue;
          n.planType = planType;
          n.roomItem = roomItemNow;
          if (roomItemNow.parent)
            for (const arg in roomItemNow.parent)
              n[arg] = roomItemNow.parent[arg];
          // 调用api
          const api = new API();
          api.set_room_stock_plan(n);
          if (onClose) {
            onClose(n);
          }
        }}>保存</Button>
      </ListItem>
    </List>
  );
}

RoomStockPlanList.propTypes = {
  stock: PropTypes.object,
  onClose: PropTypes.func
};

export default RoomStockPlanList;