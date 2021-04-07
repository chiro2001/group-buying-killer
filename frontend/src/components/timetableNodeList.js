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

function TimetableNodeList(props) {
  const classes = useStyles();
  const { node, onClose, roomItemNow } = props;
  const [selectedDate, handleDateChange] = React.useState(node.time_ ? new Date(node.time_) : new Date());
  const [selectAvailableStartDate, handleAvailableStrartDateChange] = React.useState(node.available_start ? node.available_start : 0);
  const [selectAvailableEndDate, handleAvailableEndDateChange] = React.useState(node.available_end ? node.available_end : 0);
  const [selectAvailableStartDateOn, setSelectAvailableStartDateOn] = React.useState(selectAvailableStartDate === 0 ? false : true);
  const [selectAvailableEndDateOn, setSelectAvailableEndDateOn] = React.useState(selectAvailableEndDate === 0 ? false : true);
  const [roomItemListOpen, setRoomItemListOpen] = React.useState(false);
  const [frequency, setFrequency] = React.useState('0');
  const [valuePrice, setValuePrice] = React.useState(node.price ? ('' + node.price) : (roomItemNow ? ('' + roomItemNow.price) : '0'));
  // console.log('NodeList: roomItenNow = ', roomItemNow);
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
        <ListItemText primary="设置时间" />
        <ListItemSecondaryAction>
          <DateTimePicker value={selectedDate} onChange={handleDateChange} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="设置周期" />
        <ListItemSecondaryAction>
          <TextField label="输入周期(单位:天, 0表示单次)" defaultValue={frequency} onChange={(e) => {
            setFrequency(e.target.value);
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
      <ListItem>
        <Button variant="contained" fullWidth onClick={() => {
          let n = node ? node : {};
          n.time_ = selectedDate._d ? selectedDate._d.getTime() : selectedDate.getTime();
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
          api.set_timetable_node(n);
          if (onClose) {
            onClose(n);
          }
        }}>保存</Button>
      </ListItem>
    </List>
  );
}

TimetableNodeList.propTypes = {
  node: PropTypes.object,
  onClose: PropTypes.func
};

export default TimetableNodeList;