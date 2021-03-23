import React from "react"
import Container from '@material-ui/core/Container';
import { Button, Divider, List, Typography } from "@material-ui/core";
import TimetableNode from "../components/timetableNode"
import { API } from "../api/api"

class PlanTime extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.api = new API();
    this.state = {
      timetableNodes: [],
    };
    this.api.get_timetable_node().then(nodes => { this.setState({ timetableNodes: nodes }); })
  }
  render() {
    let { config } = this.props;
    return (<Container size="xs">
      <Button onClick={() => {
        this.api.add_timetable_node({"roomItem": {"itemId": 0, "price": 0, "foodDesc": 0, "singHours": 0, "stock": 0, "itemType": 0, "periodType": 0}, "periodId": 0, "itemName": 0, "price": 0, "time_": new Date().getTime() + 1000, "cycle": 0})
      }}>增加</Button>
      <Typography variant="h6">已计划</Typography>
      <Divider></Divider>
      <List>
        {this.state.timetableNodes.map(node => <TimetableNode node={node} />)}
      </List>
    </Container>)
  }
};

export default PlanTime;