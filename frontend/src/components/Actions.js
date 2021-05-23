import { Box, Grid, List, ListItem, Typography, Paper, Card, CardContent, CardActions, Button } from "@material-ui/core";
import React from "react";
import { api } from "../api/api";
import { setTypes, updateTypes } from "../data/action";
import store from "../data/store";
import { objectUpdate } from "../utils/utils";
import ListInfo from "./ListInfo";

function ActionTag(props) {
  const { action, useActions } = props;
  if (!action) return null;
  return <Card style={{ minWidth: 200, margin: 10 }}>
    <CardContent>
      <Typography variant="h5">{action.name}</Typography>
      <Typography variant="body1">{action.desc}</Typography>
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
  const actions = store.getState().types.actions;
  if (!actions && !requesting) {
    setRequesting(true);
    api.request("action", 'GET').then(resp => {
      // console.log("resp", resp);
      store.dispatch(updateTypes("actions", resp.data.actions));
      forceUpdate();
    });
  }
  console.log('types', store.getState().types)
  let content = null;
  if (!actions) {
    content = <Typography variant="body1">正在加载Action类型...</Typography>
  } else {
    content = <Box style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {Object.keys(actions).map((action_type, k) => <ActionTag key={k} useActions={useActions} action={actions[action_type]}></ActionTag>)}
    </Box>
  }
  return <Box>
    {content}
  </Box>
}