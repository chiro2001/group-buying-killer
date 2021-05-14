import React from 'react';
import { Box, Container, LinearProgress, Button, Dialog, Link, List, ListItemText, DialogTitle, DialogContent, ListItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { API } from '../api/api';
import store from '../data/store';
import { setReserveTableData } from '../data/action'
import PlanTime from '../pages/planTime';
import PlanStock from '../pages/planStock';

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

const api = new API();

// 容易subscribe到已经卸载的component上面...
// store.subscribe(() => {
//   console.log('(tables) redux update to', store.getState());
// });

let requestedDayData = null;
let roomItemNow = {};
let setUpdateTimer = null;

function ReserveTable(props) {
  const classes = useStyles();
  const { day, data } = props;
  const date = new Date().setDay(day).toDateString();
  // const [dayData, setDayData] = React.useState(data ? data : store.getState().reserveTableData[date]);
  const [dayData, setDayData] = React.useState(data);
  const [roomList, setRoomList] = React.useState(store.getState().reserveTableData[date] ? store.getState().reserveTableData[date].roomList : []);
  const [addPlanOpen, setAddPlanOpen] = React.useState(false);
  const [planManagerOpen, setPlanManagerOpen] = React.useState(false);

  requestedDayData = JSON.stringify(store.getState().reserveTableData[date]) !== '{}' && JSON.stringify(store.getState().reserveTableData[date]) !== undefined;
  // console.log('requested', requestedDayData);
  console.log('date', date);

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
            // 查找
            const { timetableNodes, timetablePeriods, roomStockPlans } = store.getState();
            for (let node of timetableNodes) {
              if (!node.roomItem) continue;
              if (node.roomItem.itemId === roomItem.itemId) {
                planCount++;
              }
            }
            for (let stock of roomStockPlans) {
              if (!stock.roomItem) continue;
              if (stock.roomItem.itemId === roomItem.itemId) {
                planCount++;
              }
            }
            for (let period of timetablePeriods) {
              if (!period.roomItem) continue;
              if (period.roomItem.itemId === roomItem.itemId) {
                planCount++;
              } else {
                // console.log('irr', period, roomItem);
              }
            }
            // console.log('planCount', planCount);
            return (<Link key={data.periodId + name + roomItem.itemId + i + 'planLink'} onClick={() => {
              // console.log('roomItem', roomItem);
              // console.log('data', data);
              let parent = {};
              for (const arg in data)
                if (arg !== 'roomMapItemEntry')
                  parent[arg] = data[arg];
              roomItem.parent = parent;
              roomItemNow = roomItem;
              setPlanManagerOpen(true);
            }} href="#!" className={classes.planButton}>计划{planCount > 0 ? (`(${planCount})`) : ''}</Link>);
          })()
        }></MyTableCell>);
        // 临时下线
        // cells.push(<MyTableCell key={data.periodId + name + roomItem.itemId + i + 'off'} align="center" colSpan={1} content={
        //   <Link key={data.periodId + name + roomItem.itemId + i + 'planLink'} onClick={() => {
        //     console.log('roomItem', roomItem);
        //   }} href="#!">下线</Link>
        // }></MyTableCell>);
      }
      // console.log('cells', cells);
      rows.push(<TableRow key={data.periodId + i}>{cells}</TableRow>);
    }
    return rows;
  }

  const AddPlanTypeSelector = function (props) {
    const { open, onClose } = props;
    return (<Dialog open={open} onClose={onClose}>
      <DialogTitle>选择计划类型</DialogTitle>
      <DialogContent>
        <List>
          {[{ name: '按照时间点调整', val: 'timetableNode' }, { name: '按照时间段调整', val: 'timetablePeriod' }, { name: '按照库存调整', val: 'roomStock' }].map((d, i) =>
            <ListItem button onClick={() => { onClose(d.val); }} key={i}>
              <ListItemText primary={d.name} />
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>);
  }

  const PlanManager = function (props) {
    const { open, onClose } = props;
    return (<Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>管理计划</DialogTitle>
      <DialogContent>
        <PlanTime roomItemNow={roomItemNow} />
        <PlanStock roomItemNow={roomItemNow} />
      </DialogContent>
    </Dialog>);
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
    console.log('updating reserve table data!');
    if (!requestedDayData) {
      requestedDayData = true;
      api.get_reserve_table(date).then(reserveTableData => {
        // console.log('reserveTableData', reserveTableData);
        let t = store.getState().reserveTableData;
        t[date] = reserveTableData;
        store.dispatch(setReserveTableData(t));
        setDayData(reserveTableData);
        setRoomList(reserveTableData.roomList);
        requestedDayData = false;
      })
    } else {
      let reserveTableData = store.getState().reserveTableData[date];
      // console.log('got from redux:', reserveTableData);
      if (reserveTableData) {
        setDayData(reserveTableData);
        setRoomList(reserveTableData.roomList);
        // 也是要请求一遍的
        api.get_reserve_table(date).then(reserveTableData_ => {
          let t_ = store.getState().reserveTableData;
          t_[date] = reserveTableData_;
          store.dispatch(setReserveTableData(t_));
        });
      } else {
        // console.warn('got empty reserveTableData', dayData, store.getState().reserveTableData, date, JSON.stringify(store.getState().reserveTableData[date]));
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
      <TableCell align="center" colSpan={1}>[{'周' + ["日", '一', '二', '三', '四', '五', '六'][day]}]</TableCell>
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
      <AddPlanTypeSelector open={addPlanOpen} onClose={(d) => {
        switch (d) {
          case 'timetableNode':

            break;
          default:
            break;
        }
        setAddPlanOpen(false);
      }} />
      <PlanManager open={planManagerOpen} onClose={() => { setPlanManagerOpen(false); }} />
    </Container>
  );
}

export default ReserveTable;