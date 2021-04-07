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

class PlanTime extends React.Component {
  constructor(props) {
    super(props);
    this.roomItemNow = props.roomItemNow ? props.roomItemNow : {};
    const storeState = store.getState();
    this.state = {
      nodeAddOpen: false,
      periodAddOpen: false,
      timetableNodes: storeState.timetableNodes,
      timetablePeriods: storeState.timetablePeriods,
    };
    this.unsubscribe = store.subscribe(() => {
      const storeState = store.getState();
      this.setState({
        timetableNodes: storeState.timetableNodes,
        timetablePeriods: storeState.timetablePeriods
      });
    });
    this.updateData();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  async updateData() {
    const api = new API();
    await api.get_timetable_node().then(nodes => { store.dispatch(setTimetableNodes(nodes)); });
    await api.get_timetable_period().then(periods => { store.dispatch(setTimetablePeriods(periods)); });
  }
  render() {
    return (<Container>
      <List subheader={<ListSubheader component="div">
        按时间点管理
        {JSON.stringify(this.roomItemNow) === '{}' ? undefined : <Button style={{ float: 'right' }} color="primary" variant="contained" onClick={async () => {
          this.setState({
            nodeAddOpen: true
          });
        }}>增加</Button>}
      </ListSubheader>}>
        {this.state.timetableNodes.map((node, i) => this.roomItemNow.itemId ? (node.roomItem.itemId === this.roomItemNow.itemId ? <TimetableNode key={i} node={node} /> : undefined) : <TimetableNode key={i} node={node} />)}
      </List>
      <List subheader={<ListSubheader component="div">
        按时间段管理
        {JSON.stringify(this.roomItemNow) === '{}' ? undefined : <Button style={{ float: 'right' }} color="primary" variant="contained" onClick={async () => {
          this.setState({
            periodAddOpen: true
          });
        }}>增加</Button>}
      </ListSubheader>}>
        {this.state.timetablePeriods.map((period, i) => this.roomItemNow.itemId ? (period.roomItem.itemId === this.roomItemNow.itemId ? <TimetablePeriod key={i} period={period} /> : undefined) : <TimetablePeriod key={i} period={period} />)}
      </List>
      <TimetableNodeAddDialog roomItemNow={this.roomItemNow} open={this.state.nodeAddOpen} onClose={() => {
        this.setState({
          nodeAddOpen: false
        });
        this.updateData();
      }} />
      <TimetablePeriodAddDialog roomItemNow={this.roomItemNow} open={this.state.periodAddOpen} onClose={() => {
        this.setState({
          periodAddOpen: false
        });
        this.updateData();
      }} />
    </Container >);
  }
}

export default PlanTime;