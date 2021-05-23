import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListSubheader, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import Actions from "../components/Actions";
import Triggers from "../components/Triggers";
import { TriggerTag, isTriggerModified } from "../components/Triggers";
import store from "../data/store";
import { arrayRemove, deepCopy, objectUpdate } from "../utils/utils";


function TaskTag(props) {
  const { task } = props;
  return <code>{JSON.stringify(task)}</code>;
}

export default function Tasks(props) {
  const tasks = store.getState().tasks;
  const [state, setInnerState] = React.useState({
    dialogAddTaskOpen: false,
    dialogAddTriggerOpen: false,
    dialogAddActionOpen: false,
    dialogUpdateTrigger: false,
    triggers: []
  });
  const setState = (update) => setInnerState(objectUpdate(state, update));

  const dialogAddTask = <Dialog fullWidth open={state.dialogAddTaskOpen} onClose={() => setState({ dialogAddTaskOpen: false })}>
    <DialogTitle>添加新任务</DialogTitle>
    <DialogContent>
      <List>
        <ListSubheader>触发器列表</ListSubheader>
        {state.triggers.map((trigger, k) => <ListItem key={k}>
          <TriggerTag trigger={trigger} onSave={data => {
            console.log('saveing', data);
            let newTriggers = deepCopy(state.triggers);
            newTriggers[k] = data;
            console.log("newTriggers", newTriggers);
            setState({ triggers: newTriggers });
          }}></TriggerTag>
          <ListItemSecondaryAction>
            <IconButton onClick={() => {
              let newTriggers = deepCopy(state.triggers);
              newTriggers.splice(k, 1);
              console.log("newTriggers", newTriggers);
              setState({ triggers: newTriggers });
            }}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)}
        <ListItem>
          <Button onClick={() => { setState({ dialogAddTriggerOpen: true }) }} color="primary" variant="outlined">添加触发器</Button>
        </ListItem>
      </List>
      <Dialog open={state.dialogAddTriggerOpen} onClose={() => setState({ dialogAddTriggerOpen: false })}>
        <DialogTitle>选择一个触发器</DialogTitle>
        <DialogContent>
          <Triggers onClick={trigger => {
            console.log("trigger", trigger);
            let triggers = deepCopy(state.triggers);
            triggers.push(trigger);
            setState({ dialogAddTriggerOpen: false, triggers: triggers });
          }} selectMode></Triggers>
        </DialogContent>
      </Dialog>
    </DialogContent>
    <DialogActions>
      <Button color="primary">确定</Button>
      <Button onClick={() => setState({ dialogAddTaskOpen: false })}>取消</Button>
    </DialogActions>
  </Dialog>;

  return <Container>
    <Grid container spacing={3}>
      <Grid item lg={8} sm={12}>
        <Typography variant="h4">任务列表</Typography>
        <List>
          {tasks.map((task, k) => <ListItem><TaskTag task={task} key={k}></TaskTag></ListItem>)}
        </List>
      </Grid>
      <Grid item lg={4} sm={12}>
        <Container maxWidth="xs">
          <List>
            <ListSubheader>新任务</ListSubheader>
            <ListItem>
              <Button fullWidth variant="contained" color="secondary" onClick={() => { setState({ dialogAddTaskOpen: true }) }}>添加新任务</Button>
            </ListItem>
            <ListItem>
              <Button fullWidth variant="contained">设置默认任务</Button>
            </ListItem>

            <ListSubheader>全部任务管理</ListSubheader>
            <ListItem>
              <Button fullWidth variant="outlined">删除全部任务</Button>
            </ListItem>
          </List>
        </Container>
      </Grid>
    </Grid>
    {dialogAddTask}
  </Container>
}