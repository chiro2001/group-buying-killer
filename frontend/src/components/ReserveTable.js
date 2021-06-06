import React from 'react';
import { Box, Container, LinearProgress, Button, Dialog, Link, List, ListItemText, DialogTitle, DialogContent, ListItem, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { api } from '../api/api';
import store from '../data/store';
import { setDaemon } from '../data/action';
import TaskDialog, { setTaskDialogUpdate } from "./TaskDialog";
import { weekDayList } from '../utils/utils';

const useStyles = makeStyles({
  table: {
    minWidth: 1200,
  },
  foodDesc: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    contentOverflow: 'ellipsis',
    maxWidth: 160
  },
  planButton: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    contentOverflow: 'ellipsis',
    maxWidth: 160
  }
});

function MyTableCell(props) {
  let styles = { padding: 3 };
  // console.log('props.noBorder', props.noBorder);
  if (props.noBorder) styles.borderBottom = "0";
  return <TableCell align={props.align} colSpan={props.colSpan} style={styles}>{props.content}</TableCell>
}

// 容易subscribe到已经卸载的component上面...
// store.subscribe(() => {
//   console.log('(tables) redux update to', store.getState());
// });

let requestedDayData = null;
let roomItemNow = {};
let setUpdateTimer = null;

function ReserveTable(props) {
  const classes = useStyles();
  // console.log('daemon', store.getState().daemon);
  const [requestingDaemon, setRequestingDaemon] = React.useState(false);
  const [requestingUpdate, setRequestingUpdate] = React.useState(false);
  const { day, data } = props;
  const date = new Date().setDay(day).toDateString();
  // const [dayData, setDayData] = React.useState(data ? data : store.getState().daemon.reserve_table[date]);
  const [dayData, setDayData] = React.useState(data);
  const [roomList, setRoomList] = React.useState((store.getState().daemon &&
    store.getState().daemon.reserve_table &&
    store.getState().daemon.reserve_table[date]) ? store.getState().daemon.reserve_table[date].roomList : []);
  const [dialogAddTaskOpen, setDialogAddTaskOpen] = React.useState(false);

  if (!store.getState().daemon) {
    if (!requestingDaemon) {
      setRequestingDaemon(true);
      api.request("daemon", "GET").then(resp => {
        if (resp.code !== 200) return;
        store.dispatch(setDaemon(resp.data));
      });
    }
    return <LinearProgress></LinearProgress>;
  }
  if (!store.getState().daemon.reserve_table) {
    if (!requestingUpdate) {
      setRequestingUpdate(true);
      api.request("daemon", "POST", { daemon_args: { update_all: true } }).then(resp => {
        if (resp.code !== 200) return;
        store.dispatch(setDaemon(resp.data));
      });
    }
    return <LinearProgress></LinearProgress>;
  }

  requestedDayData = JSON.stringify(store.getState().daemon.reserve_table[date]) !== '{}' && JSON.stringify(store.getState().daemon.reserve_table[date]) !== undefined;
  // console.log('requested', requestedDayData);
  // console.log('date', date);

  const Period = function (props) {
    const classes = useStyles();
    const { data, roomList } = props;
    // console.log('period', data, 'roomList', roomList);
    // 先找到有几个row，再格式化输出
    let maxRow = 0;
    let roomNameList = [];
    roomList.map((roomData, i) => {
      maxRow = maxRow > data.roomMapItemEntry[roomData.roomName].length ? maxRow : data.roomMapItemEntry[roomData.roomName].length;
      roomNameList.push(roomData.roomName);
    });
    // console.log('maxRow', maxRow);
    let targetRowCenter = parseInt(maxRow / 2);
    if (targetRowCenter < 0) targetRowCenter = 0;
    // console.log('targetRowCenter', targetRowCenter);
    let rows = [];
    for (let i = 0; i < maxRow; i++) {
      let cells = [<MyTableCell key="time" key2="time" align="center" colSpan={1} content={targetRowCenter === i ? data.periodId : null} noBorder={maxRow - 1 !== i}></MyTableCell>,];
      for (let name of roomNameList) {
        // if (!(data.roomMapItemEntry[name] instanceof Array)) {
        if (!(data.roomMapItemEntry[name][i])) {
          // 没这个项的话也要占个位置
          cells.push(<MyTableCell key={data.periodId + name + i + '_'} colSpan={1}></MyTableCell>);
          continue;
        }
        let roomItem = data.roomMapItemEntry[name][i];
        // 价格
        cells.push(<MyTableCell key={data.periodId + name + roomItem.itemId + i + 'price'} align="center" colSpan={1} content={'￥' + roomItem.price}></MyTableCell>);
        // 说明
        cells.push(<MyTableCell key={data.periodId + name + roomItem.itemId + i + 'desc'} align="center" colSpan={1} content={<Box component="div" className={classes.foodDesc}>
          {roomItem.foodDesc}</Box>}></MyTableCell>);
        // 库存
        cells.push(<MyTableCell key={data.periodId + name + roomItem.itemId + i + 'stock'} align="center" colSpan={1} content={i === targetRowCenter ? (roomItem.stock + '间') : ''} noBorder={maxRow - 1 !== i}></MyTableCell>);
        // 计划
        cells.push(<MyTableCell key={data.periodId + name + roomItem.itemId + i + 'plan'} align="center" colSpan={1} content={
          (() => {
            let planCount = 0;
            for (const task of store.getState().tasks) {
              for (const action of task.actions) {
                if (action.action_type === "adjust_price") {
                  if (action.item_id === roomItem.itemId) {
                    planCount++;
                    break;
                  }
                }
              }
            }
            return (<Link key={data.periodId + name + roomItem.itemId + i + 'planLink'} onClick={() => {
              // console.log('roomItem', roomItem);
              // console.log('data', data);
              let parent = {};
              for (const arg in data)
                if (arg !== 'roomMapItemEntry')
                  parent[arg] = data[arg];
              roomItem.parent = parent;
              roomItemNow = roomItem;
              setTaskDialogUpdate(true);
              setDialogAddTaskOpen(true);
            }} className={classes.planButton}>计划{planCount > 0 ? (`(${planCount})`) : ''}</Link>);
          })()
        }></MyTableCell>);
        // 临时下线
        // cells.push(<MyTableCell key={data.periodId + name + roomItem.itemId + i + 'off'} align="center" colSpan={1} content={
        //   <Link key={data.periodId + name + roomItem.itemId + i + 'planLink'} onClick={() => {
        //     console.log('roomItem', roomItem);
        //   }} >下线</Link>
        // }></MyTableCell>);
      }
      // console.log('cells', cells);
      rows.push(<TableRow key={data.periodId + i}>{cells}</TableRow>);
    }
    return rows;
  }

  if (!setUpdateTimer) {
    setUpdateTimer = true;
    // 每分钟更新数据
    setTimeout(() => {
      if (!updateData) return;
      updateData();
    }, 60 * 1000);
  }

  const updateData = () => {
    // console.log('updating daemon!');
    if (!requestedDayData) {
      requestedDayData = true;
      api.request("daemon", "POST", { daemon_args: { reserve_table: { date } } }).then(resp => {
        if (resp.code !== 200) return;
        store.dispatch(setDaemon(resp.data));
        requestedDayData = false;
      });
    } else {
      let reserveTableData = store.getState().daemon.reserve_table[date];
      // console.log('got from redux:', reserveTableData);
      if (reserveTableData) {
        setDayData(reserveTableData);
        setRoomList(reserveTableData.roomList);
        // 也是要请求一遍的
        api.request("daemon", "POST", { daemon_args: { reserve_table: { date } } }).then(resp => {
          if (resp.code !== 200) return;
          store.dispatch(setDaemon(resp.data));
          requestedDayData = false;
        });
      } else {
        // console.warn('got empty reserveTableData', dayData, store.getState().daemon.reserve_table, date, JSON.stringify(store.getState().daemon.reserve_table[date]));
      }
    }
  };

  if (!dayData) {
    updateData();
    return (<Container>
      <LinearProgress></LinearProgress>
    </Container>);
  }
  let tableHeaderCells = [<TableCell key="time" align="center" colSpan={1}>时间</TableCell>,];
  roomList.map((d, i) => {
    tableHeaderCells.push(<TableCell key={'a' + d + i} align="center" colSpan={2}>售卖内容</TableCell>);
    tableHeaderCells.push(<TableCell key={'b' + d + i} align="center" colSpan={1}>库存</TableCell>);
    tableHeaderCells.push(<TableCell key={'c' + d + i} align="center" colSpan={1}>计划</TableCell>);
    // tableHeaderCells.push(<TableCell key={'d' + d + i} align="center" colSpan={1}>临时下线</TableCell>);
  });
  const tableHeader = <TableHead>
    <TableRow>
      <TableCell align="center" colSpan={1}>[{date.slice(date.length - 2, date.length)}日{'周' + ["日", '一', '二', '三', '四', '五', '六'][day]}]</TableCell>
      {roomList.map((d, i) =>
        <TableCell align="center" key={i} colSpan={5}>{d.roomName}({d.roomCapacity})</TableCell>
      )}
    </TableRow>
    <TableRow>
      {tableHeaderCells}
    </TableRow>
  </TableHead>;
  if (!dayData || !dayData.periodList) {
    // console.log('no data!', dayData, typeof (dayData));
    return (<Container>
      <header></header>
      <LinearProgress></LinearProgress>
    </Container>);
  }
  // console.log("roomItemNow", roomItemNow);
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table stickyHeader className={classes.table}>
          {tableHeader}
          <TableBody>
            {dayData.periodList.map((d, i) =>
              <Period key={'period' + i} data={d} roomList={roomList}></Period>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TaskDialog
        addMode
        targets={{ roomItem: roomItemNow, taskName: (roomItemNow && JSON.stringify(roomItemNow) !== "{}") ? `${roomItemNow.roomType}周${weekDayList[new Date().getDay()]}${roomItemNow.parent.periodDesc}` : null }}
        open={dialogAddTaskOpen}
        // onRefresh={() => { setState({ requestingTasks: false }); }}
        onClose={() => { setDialogAddTaskOpen(false); }}
      ></TaskDialog>
    </Container>
  );
}

export default ReserveTable;