import { List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  foodDesc: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    contentOverflow: 'ellipsis',
    maxWidth: 160
  }
})

export default function RoomItemList(props) {
  const classes = useStyles();
  const { roomItemNow, editable } = props;
  const [roomItem, setRoomItem] = React.useState(roomItemNow ? roomItemNow : {
    itemId: 0,
    date: new Date().toDateString(),
    periodId: '00:00-00:00',
    price: '0',
    foodDesc: '描述',
    singHours: 0,
    roomType: '-',
  });
  const weekDays = [
    '日', '一', '二', '三', '四', '五', '六'
  ];
  return (<List>
    <ListItem>
      <ListItemText primary={'ID'} />
      <ListItemSecondaryAction>
        <Typography variant="body1">{roomItem.itemId}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary={'价格'} />
      <ListItemSecondaryAction>
        <TextField variant="standard" disabled={!editable} defaultValue={roomItem.price} onChange={e => {
          let item = roomItem;
          item.price = e.target.value;
          setRoomItem(item);
        }}></TextField>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary={'类型'} />
      <ListItemSecondaryAction>
        <Typography variant="body1">{roomItem.roomType}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary={'描述'} />
      <ListItemSecondaryAction>
        <Typography variant="body1" className={classes.foodDesc}>{roomItem.foodDesc}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary={'时长'} />
      <ListItemSecondaryAction>
        <Typography variant="body1">{roomItem.singHours}小时</Typography>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary={'时段'} />
      <ListItemSecondaryAction>
        <Typography variant="body1">{roomItem.periodId}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary={'星期'} />
      <ListItemSecondaryAction>
        <Typography variant="body1">星期{weekDays[new Date(roomItem.date).getDay()]}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  </List>);
}