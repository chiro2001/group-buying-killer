import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, TextField, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import { api } from "../api/api";
import Actions, { wrapAction } from "../components/Actions";
import { ActionTag, isActionModified } from "../components/Actions";
import Triggers, { wrapTrigger } from "../components/Triggers";
import { TriggerTag, isTriggerModified } from "../components/Triggers";
import { setErrorInfo, setTasks, updateTypes } from "../data/action";
import store from "../data/store";
import { arrayRemove, deepCopy, isObjectValueEqual, objectUpdate } from "../utils/utils";


async function wrapTask(task) {
  const taskData = store.getState().types.task_data;
  if (!taskData) return;
  let taskWrapped = objectUpdate(taskData, task);
  // taskWrapped.triggers = taskWrapped.triggers.map(async trigger => await wrapTrigger(trigger));
  for (let i = 0; i < taskWrapped.triggers.length; i++)
    taskWrapped.triggers[i] = await wrapTrigger(taskWrapped.triggers[i]);
  // taskWrapped.actions = taskWrapped.actions.map(async action => await wrapAction(action));
  for (let i = 0; i < taskWrapped.actions.length; i++)
    taskWrapped.actions[i] = await wrapAction(taskWrapped.actions[i]);
  if (taskWrapped.triggers.includes(null) || taskWrapped.actions.includes(null)) return null;
  return taskWrapped;
}


function TaskTag(props) {
  const { task, onUpdate, onClick } = props;
  // return <code>{JSON.stringify(task)}</code>;
  return <ListItem button onClick={async () => {
    console.log('task before', task);
    const taskWrapped = await wrapTask(task);
    console.log('task after', taskWrapped);
    onClick && onClick(taskWrapped);
  }}>
    <ListItemText>
      <Box>
        <Typography variant="h5">{task.task_name}</Typography>
      </Box>
      <Box>
        <Typography variant="body2">{`tid:${task.tid}/触发器:${task.triggers.length}/Action:${task.actions.length}`}</Typography>
      </Box>
    </ListItemText>
    <ListItemSecondaryAction>
      <IconButton onClick={() => {
        api.request_key("task", task.tid, "DELETE").then(resp => {
          if (resp.code !== 200) store.dispatch(setErrorInfo(resp));
          onUpdate && onUpdate();
        });
      }}>
        <DeleteIcon></DeleteIcon>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
}

let taskDialogUpdate = false;

function TaskDialog(props) {
  const { addMode, open, onClose, onRefresh, onSave, taskOld } = props;
  const realDefaultTask = {
    task_name: '未命名任务',
    triggers: [],
    actions: [],
  };
  const defaultTask = addMode ? (props.defaultTask ? props.defaultTask : realDefaultTask) : taskOld ? taskOld : (props.defaultTask ? props.defaultTask : realDefaultTask);
  const [state, setInnerState] = React.useState({
    dialogAddTaskOpen: false,
    dialogAddTriggerOpen: false,
    dialogAddActionOpen: false,
    dialogUpdateTrigger: false,
    task: defaultTask,
    requestingTaskData: false,
    defaultTid: null,
  });
  const setState = (update) => setInnerState(objectUpdate(state, update));
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const taskData = store.getState().types.task_data;

  // console.log('taskNow', state.task);
  if (!addMode && (taskDialogUpdate || (isObjectValueEqual(state.task, realDefaultTask) && !isObjectValueEqual(defaultTask, realDefaultTask)))) {
    taskDialogUpdate = false;
    setState({ task: defaultTask });
  }

  if (!state.requestingTaskData && !taskData) {
    setState({ requestingTaskData: true });
    api.request("task", 'PATCH').then(resp => {
      // console.log("resp", resp);
      let taskData = resp.data.task_data;
      taskData.tid = null;
      store.dispatch(updateTypes("task_data", taskData));
      forceUpdate();
    })
  }

  const handleAddTask = addMode ? () => {
    // console.log('pass#2');
    if (!taskData) {
      setErrorInfo("Task数据为空。");
      console.error("Task数据为空。");
      return;
    }
    // const task = objectUpdate(taskData, { triggers: state.task.triggers, actions: state.task.actions, task_name: state.task.task_name, tid: null, });
    const task = objectUpdate(taskData, state.task);
    console.log('task', task);
    return api.request('task', "POST", { task }).then(resp => {
      // console.log('resp', resp);
      if (resp.code !== 200) return;
      const defaultTid = resp.data.tid ? (resp.data.tid + 1) : null;
      setState({
        defaultTid,
        taskName: store.getState().types.task_data ? `未命名任务${defaultTid ? defaultTid : ""}` : '未命名任务',
      });
      onRefresh && onRefresh();
    });
  } : () => {
    if (!taskOld) return;
    const task = objectUpdate(taskOld, state.task);
    console.log('task', task);
    if (onSave)
      return onSave(task);
    else return new Promise((resolve, reject) => { resolve(); });
  };

  return <Dialog fullWidth open={open} onClose={() => { onClose && onClose() }}>
    <DialogTitle>{addMode ? "添加新任务" : "设置任务"}</DialogTitle>
    <DialogContent>
      <List>
        <ListSubheader>计划名称</ListSubheader>
        <ListItem>
          <TextField value={state.task.task_name} onChange={e => {
            let newTask = deepCopy(state.task);
            newTask.task_name = e.target.value;
            setState({ task: newTask });
          }}></TextField>
        </ListItem>
        <ListSubheader>触发器列表</ListSubheader>
        {state.task.triggers.map((trigger, k) => <ListItem key={k}>
          <TriggerTag fullWidth trigger={trigger} onSave={data => {
            console.log('saveing', data);
            let newTask = deepCopy(state.task);
            newTask.triggers[k] = data;
            setState({ task: newTask });
          }}></TriggerTag>
          <ListItemSecondaryAction>
            <IconButton onClick={() => {
              let newTask = deepCopy(state.task);
              newTask.triggers.splice(k, 1);
              setState({ task: newTask });
            }}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)}
        <ListSubheader>Actions列表</ListSubheader>
        {state.task.actions.map((action, k) => <ListItem key={k}>
          <ActionTag fullWidth action={action} onSave={data => {
            console.log('saveing', data);
            let newTask = deepCopy(state.task);
            newTask.actions[k] = data;
            setState({ task: newTask });
          }}></ActionTag>
          <ListItemSecondaryAction>
            <IconButton onClick={() => {
              let newTask = deepCopy(state.task);
              newTask.actions.splice(k, 1);
              setState({ task: newTask });
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
            let newTask = deepCopy(state.task);
            newTask.triggers.push(trigger);
            setState({ dialogAddTriggerOpen: false, task: newTask });
          }} selectMode></Triggers>
        </DialogContent>
      </Dialog>
      <Dialog open={state.dialogAddActionOpen} onClose={() => setState({ dialogAddActionOpen: false })}>
        <DialogTitle>选择一个Action</DialogTitle>
        <DialogContent>
          <Actions onClick={action => {
            console.log("action", action);
            let newTask = deepCopy(state.task);
            newTask.actions.push(action);
            setState({ dialogAddActionOpen: false, task: newTask });
          }} selectMode></Actions>
        </DialogContent>
      </Dialog>
    </DialogContent>
    <DialogActions>
      <Button color="primary" disabled={state.task.triggers.length === 0 || state.task.actions.length === 0} onClick={async () => {
        // console.log('pass#1');
        handleAddTask().then(() => {
          setState({ task: defaultTask });
          onClose && onClose();
        });
      }}>确定</Button>
      <Button onClick={() => { onClose && onClose(); }}>取消</Button>
    </DialogActions>
  </Dialog >;
}

export default function Tasks(props) {
  const [state, setInnerState] = React.useState({
    requestingTasks: false,
    dialogAddTaskOpen: false,
    addMode: true,
    task: null,
  });
  const tasks = store.getState().tasks;
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const setState = (update) => setInnerState(objectUpdate(state, update));

  if (!state.requestingTasks) {
    setState({ requestingTasks: true });
    api.request("task", "GET").then(resp => {
      if (resp.code !== 200) {
        store.dispatch(setErrorInfo(resp));
        return;
      }
      store.dispatch(setTasks(resp.data.tasks));
      forceUpdate();
    });
  }

  return <Container>
    <Grid container spacing={3}>
      <Grid item lg={8} sm={12}>
        <Typography variant="h4">任务列表</Typography>
        {tasks.length > 0 ? <List>
          {tasks.map((task, k) => <TaskTag onClick={task => {
            console.log('Task: onClick', task);
            taskDialogUpdate = true;
            setState({ dialogAddTaskOpen: true, addMode: false, task });
          }} onUpdate={() => { setState({ requestingTasks: false }); }} key={k} task={task}></TaskTag>)}
        </List> : <List>
          <ListItem>
            <Typography variant="body1" color="textSecondary">空列表</Typography>
          </ListItem>
        </List>}
      </Grid>
      <Grid item lg={4} sm={12}>
        <Container maxWidth="xs">
          <List>
            <ListSubheader>新任务</ListSubheader>
            <ListItem>
              <Button fullWidth variant="contained" color="secondary" onClick={() => {
                taskDialogUpdate = true;
                setState({ dialogAddTaskOpen: true, addMode: true });
              }}>添加新任务</Button>
            </ListItem>
            <ListItem>
              <Button fullWidth variant="contained">设置默认任务</Button>
            </ListItem>

            <ListSubheader>全部任务管理</ListSubheader>
            <ListItem>
              <Button fullWidth disabled={tasks.length == 0} variant="outlined" onClick={() => {
                let tids = {};
                tasks.map(task => { tids = Object.assign(tids, { [task.tid]: task.tid }); });
                api.request("task", "DELETE", { tids }).then(resp => {
                  // forceUpdate();
                  setState({ requestingTasks: false });
                });
              }}>删除全部任务</Button>
            </ListItem>
          </List>
        </Container>
      </Grid>
    </Grid>
    <TaskDialog taskOld={state.task}
      addMode={state.addMode}
      open={state.dialogAddTaskOpen}
      onRefresh={() => { setState({ requestingTasks: false }); }}
      onClose={() => { setState({ dialogAddTaskOpen: false }); }}
      onSave={task => {
        return api.request_key('task', task.tid, "POST", { task }).then(resp => {
          setState({ requestingTasks: false });
        });
      }}
    ></TaskDialog>
  </Container >
}