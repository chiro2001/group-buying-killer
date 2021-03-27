import React from "react"
import Container from '@material-ui/core/Container';
import ReserveTables from "../components/reserveTables";
import { Divider, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import store from "../data/store";

function Launch() {
  const { timetableNodes, timetablePeriods, config } = store.getState();
  return (<Container style={{ overflowX: 'auto', width: '100%' }}>
    <Typography variant="h5">执行状态</Typography>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align="center">任务种类数</TableCell>
          <TableCell align="center">按照时间点调整</TableCell>
          <TableCell align="center">按照时间点调整</TableCell>
          <TableCell align="center">按照库存量调整</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">{0}种</TableCell>
          <TableCell align="center">{timetableNodes.length}个任务</TableCell>
          <TableCell align="center">{timetablePeriods.length}个任务</TableCell>
          <TableCell align="center">{0}个任务</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    {/* <Divider></Divider> */}
    <br />
    <Typography variant="h5">数据总览</Typography>
    {/* <Divider></Divider> */}
    <ReserveTables config={config} />
  </Container>);
}

export default Launch;