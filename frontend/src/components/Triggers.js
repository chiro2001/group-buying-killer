import { Box, Grid, List, ListItem, Typography, Paper, Card, CardContent, CardActions, Button } from "@material-ui/core";
import React from "react";
import { api } from "../api/api";
import { setTypes, updateTypes } from "../data/action";
import store from "../data/store";
import { objectUpdate } from "../utils/utils";
import ListInfo from "./ListInfo";

function ActionTag(props) {
  const { trigger, useActions } = props;
  if (!trigger) return null;
  return <Card style={{ minWidth: 200, margin: 10 }}>
    <CardContent>
      <Typography variant="h5">{trigger.name}</Typography>
      <Typography variant="body1">{trigger.desc}</Typography>
    </CardContent>
    {useActions ? <CardActions>
      <Button color="primary">使用</Button>
    </CardActions> : null}
  </Card>
}

export default function Actions(props) {
  const { useActions } = props;
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
  console.log('types', store.getState().types)
  let content = null;
  if (!triggers) {
    content = <Typography variant="body1">正在加载触发器类型...</Typography>
  } else {
    content = <Box style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {Object.keys(triggers).map((trigger_type, k) => <ActionTag key={k} useActions={useActions} trigger={triggers[trigger_type]}></ActionTag>)}
    </Box>
  }
  return <Box>
    {content}
  </Box>
}