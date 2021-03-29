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

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function TimetableNodeList(props) {
  const classes = useStyles();
  const { node, onClose, roomItemNow } = props;
  const [selectedDate, handleDateChange] = React.useState(node.time_ ? node.time_ : new Date());
  const [selectAvailableStartDate, handleAvailableStrartDateChange] = React.useState(node.available_start ? node.available_start : 0);
  const [selectAvailableEndDate, handleAvailableEndDateChange] = React.useState(node.available_end ? node.available_end : 0);
  const [selectAvailableStartDateOn, setSelectAvailableStartDateOn] = React.useState(selectAvailableStartDate === 0 ? false : true);
  const [selectAvailableEndDateOn, setSelectAvailableEndDateOn] = React.useState(selectAvailableEndDate === 0 ? false : true);
  const [roomItemListOpen, setRoomItemListOpen] = React.useState(false);
  const inputPrice = React.useRef();
  const [valuePrice, setValuePrice] = React.useState(node.price);
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
          <TextField label="输入价格" ref={inputPrice} onChange={(e) => {
            // console.log(getTextFieldValue(inputPrice));
            console.log(e.target.value);
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
          let n = node;
          if (!selectedDate._d)
            n.time_ = selectedDate.getTime();
          else
            n.time_ = selectedDate._d.getTime();
          n.available_start = selectAvailableStartDate;
          n.available_end = selectAvailableEndDate;
          n.price = valuePrice;
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