import React from "react"
import Container from '@material-ui/core/Container';
import ReserveTables from "../components/reserveTables";
import { Divider, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import store from "../data/store";

class StateNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        timetableNodes: store.getState().timetableNodes,
        timetablePeriods: store.getState().timetablePeriods,
        roomStockPlans: store.getState().roomStockPlans
      });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (<Table>
      <TableBody>
        <TableRow>
          <TableCell align="center">任务种类数</TableCell>
          <TableCell align="center">按照时间点调整</TableCell>
          <TableCell align="center">按照时间段调整</TableCell>
          {/* <TableCell align="center">按照库存量调整</TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell align="center">{2}种</TableCell>
          <TableCell align="center">{this.state.timetableNodes.length}个任务</TableCell>
          <TableCell align="center">{this.state.timetablePeriods.length}个任务</TableCell>
          {/* <TableCell align="center">{this.state.roomStockPlans.length}个任务</TableCell> */}
        </TableRow>
      </TableBody>
    </Table>);
  }
}

function Launch() {
  return (<Container style={{ overflowX: 'auto', width: '100%' }}>
    <Typography variant="h5">执行状态</Typography>
    <StateNow></StateNow>
    <br />
    <Typography variant="h5">数据总览</Typography>
    <ReserveTables />
  </Container>);
}

export default Launch;