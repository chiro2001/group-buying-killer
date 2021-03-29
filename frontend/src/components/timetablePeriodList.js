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

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function TimetablePeriodList(props) {
  const classes = useStyles();
  const { period, onClose, roomItemNow } = props;
  const [selectedStartDate, handleDateStartChange] = React.useState(period.time_start ? period.time_start : new Date());
  const [selectedEndDate, handleDateEndChange] = React.useState(period.time_end ? period.time_end : new Date());
  const [selectAvailableStartDate, handleAvailableStrartDateChange] = React.useState(period.available_start ? period.available_start : 0);
  const [selectAvailableEndDate, handleAvailableEndDateChange] = React.useState(period.available_end ? period.available_end : 0);
  const [selectAvailableStartDateOn, setSelectAvailableStartDateOn] = React.useState(selectAvailableStartDate === 0 ? false : true);
  const [selectAvailableEndDateOn, setSelectAvailableEndDateOn] = React.useState(selectAvailableEndDate === 0 ? false : true);
  const inputPrice = React.useRef();
  const [valuePrice, setValuePrice] = React.useState(period.price);
  return (
    <List component="div" disablePadding className={classes.nested}>
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
          let n = period;
          n.time_ = valuePrice;
          console.log('onClose', onClose);
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