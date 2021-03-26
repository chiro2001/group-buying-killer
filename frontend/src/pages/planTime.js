import React from "react"
import Container from '@material-ui/core/Container';
import { Button, Divider, List, ListSubheader, Typography } from "@material-ui/core";
import TimetableNode from "../components/timetableNode"
import TimetablePeriod from "../components/timetablePeriod"
import { API } from "../api/api"
import TimetableNodeAddDialog from "./timetableNodeAddDialog";
import TimetablePeriodAddDialog from "./timetablePeriodAddDialog";

class PlanTime extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.updateData = this.updateData.bind(this);
    this.api = new API();
    this.state = {
      timetableNodes: [],
      timetablePeriods: [],
      nodeAddOpen: false,
      periodAddOpen: false,
    };
    this.updateData();
  }
  async updateData() {
    await this.api.get_timetable_node().then(nodes => { this.setState({ timetableNodes: nodes }); })
    await this.api.get_timetable_period().then(periods => { this.setState({ timetablePeriods: periods }); })
  }
  render() {
    let { config } = this.props;
    let key_count = 0;
    return (<Container size="xs">
      <List subheader={<ListSubheader component="div">
        按时间点管理
        <Button style={{ float: 'right' }} color="primary" variant="contained" onClick={async () => {
          // await this.api.add_timetable_node({ "roomItem": { "itemId": 0, "price": 0, "foodDesc": 0, "singHours": 0, "stock": 0, "itemType": 0, "periodType": 0 }, "periodId": 0, "itemName": 0, "price": 0, "time_": new Date().getTime() + 1000, "cycle": 0 });
          // await this.updateData();
          this.setState({ nodeAddOpen: true });
        }}>增加</Button>
      </ListSubheader>}>
        {this.state.timetableNodes.map(node => <TimetableNode key={key_count++} node={node} />)}
      </List>
      <List subheader={<ListSubheader component="div">
        按时间段管理
        <Button style={{ float: 'right' }} color="primary" variant="contained" onClick={async () => {
          // await this.api.add_timetable_period({ "roomItem": { "itemId": 0, "price": 0, "foodDesc": 0, "singHours": 0, "stock": 0, "itemType": 0, "periodType": 0 }, "periodId": 0, "itemName": 0, "price": 0, "time_start": new Date().getTime() + 1000, "time_end": new Date().getTime() + 1000 * 60 * 2, "cycle": 0 });
          // await this.updateData();
          this.setState({ periodAddOpen: true });
        }}>增加</Button>
      </ListSubheader>}>
        {this.state.timetablePeriods.map(period => <TimetablePeriod key={key_count++} period={period} />)}
      </List>
      <TimetableNodeAddDialog config={config} open={this.state.nodeAddOpen} onClose={() => { this.setState({ nodeAddOpen: false }); this.updateData(); }} />
      <TimetablePeriodAddDialog config={config} open={this.state.periodAddOpen} onClose={() => { this.setState({ periodAddOpen: false }); this.updateData(); }} />
    </Container >)
  }
};

export default PlanTime;