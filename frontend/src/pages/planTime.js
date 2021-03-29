import React from "react"
import Container from '@material-ui/core/Container';
import { Button, Divider, List, ListSubheader, Typography } from "@material-ui/core";
import TimetableNode from "../components/timetableNode"
import TimetablePeriod from "../components/timetablePeriod"
import { API } from "../api/api"
import TimetableNodeAddDialog from "./timetableNodeAddDialog";
import TimetablePeriodAddDialog from "./timetablePeriodAddDialog";
import store from '../data/store'
import { setTimetablePeriods, setTimetableNodes } from "../data/action";

function PlanTime(props) {
  const roomItemNow = props.roomItemNow ? props.roomItemNow : {};
  const [nodeAddOpen, setNodeAddOpen] = React.useState(false);
  const [periodAddOpen, setPeriodAddOpen] = React.useState(false);
  const { timetableNodes, timetablePeriods, config } = store.getState();
  async function updateData() {
    const api = new API();
    await api.get_timetable_node().then(nodes => { store.dispatch(setTimetableNodes(nodes)); });
    await api.get_timetable_period().then(periods => { store.dispatch(setTimetablePeriods(periods)); });
  }
  return (<Container>
    <List subheader={<ListSubheader component="div">
      按时间点管理
      {JSON.stringify(roomItemNow) === '{}' ? undefined : <Button style={{ float: 'right' }} color="primary" variant="contained" onClick={async () => {
        setNodeAddOpen(true);
      }}>增加</Button>}
    </ListSubheader>}>
      {timetableNodes.map((node, i) => roomItemNow.itemId ? (node.roomItem.itemId === roomItemNow.itemId ? <TimetableNode key={i} node={node} /> : undefined) : <TimetableNode key={i} node={node} />)}
    </List>
    <List subheader={<ListSubheader component="div">
      按时间段管理
      {JSON.stringify(roomItemNow) === '{}' ? undefined : <Button style={{ float: 'right' }} color="primary" variant="contained" onClick={async () => {
        setPeriodAddOpen(true);
      }}>增加</Button>}
    </ListSubheader>}>
      {timetablePeriods.map((period, i) => roomItemNow.itemId ? (period.roomItem.itemId === roomItemNow.itemId ? <TimetablePeriod key={i} period={period} /> : undefined) : <TimetablePeriod key={i} period={period} />)}
    </List>
    <TimetableNodeAddDialog roomItemNow={roomItemNow} config={config} open={nodeAddOpen} onClose={() => {
      setNodeAddOpen(false);
      updateData();
    }} />
    <TimetablePeriodAddDialog roomItemNow={roomItemNow} config={config} open={periodAddOpen} onClose={() => {
      setPeriodAddOpen(false);
      updateData();
    }} />
  </Container >);
}

export default PlanTime;