import React from "react"
import Container from '@material-ui/core/Container';
import { Button, Divider, List, ListSubheader, Typography } from "@material-ui/core";
import TimetableNode from "../components/timetableNode"
import { API } from "../api/api"

class PlanTime extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.updateData = this.updateData.bind(this);
    this.api = new API();
    this.state = {
      timetableNodes: [],
    };
    this.updateData();
  }
  async updateData() {
    await this.api.get_timetable_node().then(nodes => { this.setState({ timetableNodes: nodes }); })
  }
  render() {
    let { config } = this.props;
    let key_count = 0;
    return (<Container size="xs">
      <Button onClick={async () => {
        await this.api.add_timetable_node({ "roomItem": { "itemId": 0, "price": 0, "foodDesc": 0, "singHours": 0, "stock": 0, "itemType": 0, "periodType": 0 }, "periodId": 0, "itemName": 0, "price": 0, "time_": new Date().getTime() + 1000, "cycle": 0 });
        await this.updateData();
      }}>增加</Button>
      <List subheader={<ListSubheader component="div">
        已计划
        </ListSubheader>}>
        {this.state.timetableNodes.map(node => <TimetableNode key={key_count++} node={node} />)}
      </List>
    </Container >)
  }
};

export default PlanTime;