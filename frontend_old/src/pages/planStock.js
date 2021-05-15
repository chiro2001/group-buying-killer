import React from "react"
import Container from '@material-ui/core/Container';
import { Button, Divider, List, ListSubheader, Typography } from "@material-ui/core";
import { API } from "../api/api"
import store from '../data/store'
import { setRoomStockPlans } from "../data/action";
import RoomStockPlan from "../components/roomStockPlan";
import RoomStockPlanAddDialog from "./roomStockPlanAddDialog";

class PlanStock extends React.Component {
  constructor(props) {
    super(props);
    this.roomItemNow = props.roomItemNow ? props.roomItemNow : {};
    const storeState = store.getState();
    this.state = {
      stockAddOpen: false,
      periodAddOpen: false,
      roomStockPlan: storeState.roomStockPlans
    };
    this.unsubscribe = store.subscribe(() => {
      const storeState = store.getState();
      this.setState({
        roomStockPlan: storeState.roomStockPlans
      });
    });
    this.updateData();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  async updateData() {
    const api = new API();
    await api.get_room_stock_plan().then(stocks => { store.dispatch(setRoomStockPlans(stocks)); });
  }
  render() {
    return (<Container>
      <List subheader={<ListSubheader component="div">
        按库存状态管理
        {JSON.stringify(this.roomItemNow) === '{}' ? undefined : <Button style={{ float: 'right' }} color="primary" variant="contained" onClick={async () => {
          this.setState({
            stockAddOpen: true
          });
        }}>增加</Button>}
      </ListSubheader>}>
        {this.state.roomStockPlan.length == 0 ? <Typography variant="body1">（空列表）</Typography> : this.state.roomStockPlan.map((stock, i) => this.roomItemNow.itemId ? (stock.roomItem.itemId === this.roomItemNow.itemId ? <RoomStockPlan key={i} stock={stock} /> : undefined) : <RoomStockPlan key={i} stock={stock} />)}
      </List>
      <RoomStockPlanAddDialog roomItemNow={this.roomItemNow} open={this.state.stockAddOpen} onClose={() => {
        this.setState({
          stockAddOpen: false
        });
        this.updateData();
      }} />
    </Container >);
  }
}

export default PlanStock;