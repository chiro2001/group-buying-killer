import { Box, Grid, List, ListItem, Typography, Paper, Card, CardContent, CardActions, Button } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { api } from "../api/api";
import { setTypes, updateTypes } from "../data/action";
import store from "../data/store";
import { deepCopy, isObjectValueEqual, objectUpdate } from "../utils/utils";
import ListEdit from "./ListEdit";
import ListInfo from "./ListInfo";

const keyNames = {
  'start_date': "开始时间",
  'end_date': '结束时间',
  "interval": "间隔",
  "run_date": '运行时间'
};

export function isTriggerModified(item, type = "triggers") {
  return !isObjectValueEqual(item.data, store.getState().types[type][item.type].data);
}

function getTimedeltaString(timedelta) {
  if (typeof (timedelta) !== 'number') return "";
  const timedeltaUnits = {
    "秒": 1, "分": 60, "时": 60 * 60,
    "天": 24 * 60 * 60, "周": 7 * 24 * 60 * 60
  };
  for (let i = 1; i < Object.keys(timedeltaUnits).length; i++) {
    if (timedelta < timedeltaUnits[Object.keys(timedeltaUnits)[i]]) {
      return `${(timedelta / timedeltaUnits[Object.keys(timedeltaUnits)[i - 1]]).toFixed(2)}${Object.keys(timedeltaUnits)[i - 1]}`;
    }
  }
  return `${(timedelta / timedeltaUnits[Object.keys(timedeltaUnits)[Object.keys(timedeltaUnits).length - 1]]).toFixed(2)}${Object.keys(timedeltaUnits)[Object.keys(timedeltaUnits).length - 1]}`;
}

function getDataString(data, typeName, dataType) {
  let res = "";
  if (typeof (data) !== 'object') return;
  for (const key in data) {
    const showName = keyNames ? (keyNames[key] || key) : (key);
    const args = dataType && typeName && store.getState().types[typeName][dataType].args[key] ?
      store.getState().types[typeName][dataType].args[key] : null;
    if (args && !args.editable) continue;
    let value = data[key];
    if (!value) continue;
    if (value.startsWith("datetime|")) {
      value = moment(value.slice('datetime|'.length)).calendar();
    } else if (value.startsWith('timedelta|')) {
      value = getTimedeltaString(parseFloat(value.slice('timedelta|'.length)));
    }
    res = `${(res.length === 0 ? '' : (res + '/'))}${showName}:${value}`
  }
  return res;
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
      {isTriggerModified(trigger, "triggers") ?
        getDataString(trigger.data, "triggers", trigger.type) :
        <Typography variant="body1">{trigger.desc}</Typography>
      }
      <ListEdit
        dismiss={['version', 'timezone']}
        keyNames={keyNames}
        open={dialogOpen}
        dataType={trigger.type}
        typeName="triggers"
        onClose={handleCloseDialog}
        defaultValue={trigger.data}
        onSave={newData => {
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