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
import { parseTimePoint, parseTimePeriod, sleep } from '../utils/utils'
import RoomItemList from './roomItemList';
import { API } from '../api/api';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function TimetablePeriodList(props) {
  const classes = useStyles();
  const { period, onClose, roomItemNow } = props;
  const [selectedStartDate, handleDateStartChange] = React.useState(period.time_start ? new Date(period.time_start) : new Date());
  const [selectedEndDate, handleDateEndChange] = React.useState(period.time_end ? new Date(period.time_end) : new Date());
  const [selectAvailableStartDate, handleAvailableStrartDateChange] = React.useState(period.available_start ? period.available_start : 0);
  const [selectAvailableEndDate, handleAvailableEndDateChange] = React.useState(period.available_end ? period.available_end : 0);
  const [selectAvailableStartDateOn, setSelectAvailableStartDateOn] = React.useState(selectAvailableStartDate === 0 ? false : true);
  const [selectAvailableEndDateOn, setSelectAvailableEndDateOn] = React.useState(selectAvailableEndDate === 0 ? false : true);
  const [roomItemListOpen, setRoomItemListOpen] = React.useState(false);
  const [valuePrice, setValuePrice] = React.useState(period.price ? ('' + period.price) : (roomItemNow ? ('' + roomItemNow.price) : '0'));
  // console.log('PeriodList: roomItenNow = ', roomItemNow);
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
        <ListItemText primary="设置价格开始时间" />
        <ListItemSecondaryAction>
          <DateTimePicker value={selectedStartDate} onChange={handleDateStartChange} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="设置价格结束时间" />
        <ListItemSecondaryAction>
          <DateTimePicker value={selectedEndDate} onChange={handleDateEndChange} />
        </ListItemSecondaryAction>
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
                await sleep(600);
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
                await sleep(600);
                selectAvailableEndDate === 0 ? setSelectAvailableEndDateOn(false) : setSelectAvailableEndDateOn(true);
              }} />}
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <Button variant="contained" fullWidth onClick={() => {
          let n = period ? period : {};
          n.time_start = selectedStartDate._d ? selectedStartDate._d.getTime() : selectedStartDate.getTime();
          n.time_end = selectedEndDate._d ? selectedEndDate._d.getTime() : selectedEndDate.getTime();
          n.available_start = selectAvailableStartDate._d ? selectAvailableStartDate._d.getTime() : selectAvailableStartDate;
          n.available_end = selectAvailableEndDate._d ? selectAvailableEndDate._d.getTime() : selectAvailableEndDate;
          if (n.available_start === 0) delete n.available_start;
          if (n.available_end === 0) delete n.available_end;
          n.price = valuePrice;
          n.roomItem = roomItemNow;
          if (roomItemNow.parent)
            for (const arg in roomItemNow.parent)
              n[arg] = roomItemNow.parent[arg];
          // 调用api
          const api = new API();
          api.add_timetable_period(n);
          if (onClose) {
            onClose(n);
          }
        }}>保存</Button>
      </ListItem>
    </List>
  );
}

TimetablePeriodList.propTypes = {
  period: PropTypes.object,
  onClose: PropTypes.func
};

export default TimetablePeriodList;