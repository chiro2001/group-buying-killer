import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Typography } from "@material-ui/core";
import React from "react";
import { objectUpdate } from "../utils/utils";

export default function ListEdit(props) {
  const { defaultValue, open, onClose, title, keyNames } = props;
  const onSave = props.onSave ? props.onSave : null;
  const [data, setInnerData] = React.useState(defaultValue);
  const setData = (update) => setInnerData(objectUpdate(data, update));
  const [openChild, setOpenChild] = React.useState(false);
  const [child, setChild] = React.useState(null);
  const [childTitle, setChildTitle] = React.useState(null);

  const handleSave = () => {
    onSave(data);
  }

  return <Dialog fullWidth open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <List style={{ width: "100%" }}>
        {Object.keys(data).map((v, k) => {
          const showName = keyNames ? (keyNames[v] || v) : (v);
          if (((typeof (data[v]) !== "string")) && !data[v]) return undefined;
          if (typeof (data[v]) === 'object') {
            return <ListItem key={k} button onClick={() => {
              setChild(data[v]);
              setChildTitle(showName);
              setOpenChild(true);
            }}>{showName}</ListItem>
          } else {
            return <ListItem key={k}>
              <ListItemText>{showName}</ListItemText>
              <ListItemSecondaryAction>
                <TextField value={`${data[v]}`} onChange={e => {
                  const newValue = (typeof (data[v]) === "number" ? parseFloat(e.target.value) : `${e.target.value}`);
                  setData({ [v]: newValue });
                }}></TextField>
              </ListItemSecondaryAction>
            </ListItem>
          }
        }
        )}
      </List>
      {(child && childTitle) ? <ListEdit defaultValue={child} open={openChild} onClose={() => { setOpenChild(false); }} title={childTitle}></ListEdit> : undefined}
    </DialogContent>
    {onSave ? <DialogActions>
      <Button color="primary" onClick={handleSave}>保存</Button>
      <Button onClick={onClose}>取消</Button>
    </DialogActions> : <DialogActions><Box style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}><Typography style={{ height: "100%" }} variant="body1" color="secondary">无法保存</Typography></Box></DialogActions>}
  </Dialog>
}