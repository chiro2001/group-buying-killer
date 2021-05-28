import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListSubheader, TextField, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import { api } from "../api/api";
import Actions from "../components/Actions";
import { ActionTag, isActionModified } from "../components/Actions";
import Triggers from "../components/Triggers";
import { TriggerTag, isTriggerModified } from "../components/Triggers";
import { setErrorInfo, updateTypes } from "../data/action";
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
    triggers: [],
    actions: [],
    requesting: false,
    taskName: store.getState().types.task_data ? `未命名任务${store.getState().types.task_data.tid}` : '未命名任务'
  });
  const taskData = store.getState().types.task_data;
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const setState = (update) => setInnerState(objectUpdate(state, update));

  if (!state.requesting && !taskData) {
    setState({ requesting: true });
    api.request("task", 'PATCH').then(resp => {
      // console.log("resp", resp);
      store.dispatch(updateTypes("task_data", resp.data.task_data));
      forceUpdate();
    })
  }

  const handleAddTask = async () => {
    console.log('pass#2');
    if (!taskData) {
      setErrorInfo("Task数据为空。");
      console.error("Task数据为空。");
      return;
    }
    const task = objectUpdate(taskData, { triggers: state.triggers, actions: state.actions, task_name: state.taskName, tid: null, });
    console.log('task', task);
    const resp = await api.request('task', "POST", { task });
    console.log('resp', resp);
  };

  const dialogAddTask = <Dialog fullWidth open={state.dialogAddTaskOpen} onClose={() => setState({ dialogAddTaskOpen: false })}>
    <DialogTitle>添加新任务</DialogTitle>
    <DialogContent>
      <List>
        <ListSubheader>计划名称</ListSubheader>
        <ListItem>
          <TextField value={state.taskName} onChange={e => {
            setState({ taskName: e.target.value });
          }}></TextField>
        </ListItem>
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
        <ListSubheader>Actions列表</ListSubheader>
        {state.actions.map((action, k) => <ListItem key={k}>
          <ActionTag action={action} onSave={data => {
            console.log('saveing', data);
            let newActions = deepCopy(state.actions);
            newActions[k] = data;
            console.log("newActions", newActions);
            setState({ actions: newActions });
          }}></ActionTag>
          <ListItemSecondaryAction>
            <IconButton onClick={() => {
              let newActions = deepCopy(state.actions);
              newActions.splice(k, 1);
              console.log("newActions", newActions);
              setState({ actions: newActions });
            }}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)}
        <ListItem>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={6}>
              <Button fullWidth onClick={() => { setState({ dialogAddTriggerOpen: true }) }} color="primary" variant="outlined">添加触发器</Button>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Button fullWidth onClick={() => { setState({ dialogAddActionOpen: true }) }} color="primary" variant="outlined">添加Action</Button>
            </Grid>
          </Grid>
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
      <Dialog open={state.dialogAddActionOpen} onClose={() => setState({ dialogAddActionOpen: false })}>
        <DialogTitle>选择一个Action</DialogTitle>
        <DialogContent>
          <Actions onClick={action => {
            console.log("action", action);
            let actions = deepCopy(state.actions);
            actions.push(action);
            setState({ dialogAddActionOpen: false, actions: actions });
          }} selectMode></Actions>
        </DialogContent>
      </Dialog>
    </DialogContent>
    <DialogActions>
      <Button color="primary" disabled={state.triggers.length === 0 || state.actions.length === 0} onClick={async () => {
        console.log('pass#1');
        await handleAddTask();
        setState({ dialogAddTaskOpen: false, triggers: [], actions: [] });
      }}>确定</Button>
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