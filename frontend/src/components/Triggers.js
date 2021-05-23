import { Box, Grid, List, ListItem, Typography, Paper, Card, CardContent, CardActions, Button } from "@material-ui/core";
import React from "react";
import { api } from "../api/api";
import { setTypes, updateTypes } from "../data/action";
import store from "../data/store";
import { deepCopy, isObjectValueEqual, objectUpdate } from "../utils/utils";
import ListEdit from "./ListEdit";
import ListInfo from "./ListInfo";

export function isTriggerModified(item, type = "triggers") {
  return !isObjectValueEqual(item.data, store.getState().types[type][item.type].data);
}

export function TriggerTag(props) {
  let { trigger, selectMode, onClick, onSave } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [toUse, setToUse] = React.useState(false);
  onClick = onClick ? onClick : () => { };
  if (!trigger) return null;
  const handleCloseDialog = () => { setDialogOpen(false); };
  const handleClick = newTrigger => {
    onClick(newTrigger ? newTrigger : trigger, selectMode);
  };
  return <Card style={{ minWidth: 200, margin: 10 }}>
    <CardContent onClick={selectMode ? () => { } : () => { handleClick(); }}>
      <Typography variant="h5">{trigger.name}</Typography>
      <Typography variant="body1">{trigger.desc}</Typography>
      <ListEdit open={dialogOpen} onClose={handleCloseDialog} defaultValue={trigger.data} onSave={newData => {
        let newTrigger = deepCopy(trigger);
        newTrigger.data = newData;
        console.log(newData);
        onSave && onSave(newTrigger);
        handleCloseDialog();
        if (toUse) handleClick(newTrigger);
      }}></ListEdit>
    </CardContent>
    {selectMode ? <CardActions>
      <Button color="primary" onClick={selectMode ? () => { handleClick(); } : () => { }}>使用</Button>
      <Button color="primary" onClick={() => { setDialogOpen(true); setToUse(true); }}>修改设置并使用</Button>
    </CardActions> : <CardActions>
      <Button color={isTriggerModified(trigger, "triggers") ? "primary" : "secondary"} onClick={() => { setDialogOpen(true); }}>修改设置</Button>
    </CardActions>}
  </Card>
}

export default function Triggers(props) {
  let { selectMode, onClick } = props;
  onClick = onClick ? onClick : () => { };
  const [requesting, setRequesting] = React.useState(false);
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const triggers = store.getState().types.triggers;
  if (!triggers && !requesting) {
    setRequesting(true);
    api.request("trigger", 'GET').then(resp => {
      // console.log("resp", resp);
      store.dispatch(updateTypes("triggers", resp.data.triggers));
      forceUpdate();
    });
  }
  // console.log('types', store.getState().types)
  let content = null;
  if (!triggers) {
    content = <Typography variant="body1">正在加载触发器类型...</Typography>
  } else {
    content = <Box style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {Object.keys(triggers).map((trigger_type, k) => <TriggerTag onClick={onClick} key={k} selectMode={selectMode} trigger={triggers[trigger_type]}></TriggerTag>)}
    </Box>
  }
  return <Box>
    {content}
  </Box>
}