import { Select, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Typography, MenuItem, IconButton } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import store from "../data/store";
import { isIterator, objectUpdate } from "../utils/utils";

export default function ListEdit(props) {
  const { defaultValue, open, onClose, title, keyNames, dataType, typeName } = props;
  const dismiss = props.dismiss && isIterator(props.dismiss) ? props.dismiss : [];
  const onSave = props.onSave ? props.onSave : null;
  const [data, setInnerData] = React.useState(defaultValue);
  const setData = (update) => setInnerData(objectUpdate(data, update));
  const [openChild, setOpenChild] = React.useState(false);
  const [child, setChild] = React.useState(null);
  const [childTitle, setChildTitle] = React.useState(null);
  const timedeltaUnits = {
    "秒": 1, "分": 60, "时": 60 * 60,
    "天": 24 * 60 * 60, "周": 7 * 24 * 60 * 60
  };
  const [timedeltaUnit, setTimedeltaUnit] = React.useState({});

  const handleSave = () => {
    onSave(data);
  }

  return <Dialog fullWidth open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <List style={{ width: "100%" }}>
        {Object.keys(data).map((v, k) => {
          if (dismiss.indexOf(v) >= 0) return null;
          const args = dataType && typeName && store.getState().types[typeName][dataType].args[v] ?
            store.getState().types[typeName][dataType].args[v] : null;
          // console.log('args', args);
          if (dataType && typeName && args && !args.editable) return null;
          const showName = keyNames ? (keyNames[v] || v) : (v);
          // if (((typeof (data[v]) !== "string")) && !data[v]) return undefined;
          let value = data[v];
          if (!value && dataType && typeName && args) {
            value = `${args.type}|${args.value ? args.value : ''}`;
          }
          if (typeof (value) === 'object') {
            return <ListItem key={k} button onClick={() => {
              setChild(value);
              setChildTitle(showName);
              setOpenChild(true);
            }}>{showName}</ListItem>
          } else {
            let actionData = null;
            if (typeof (value) === "string" && value.startsWith("timezone|")) {
              // 时区暂时不可编辑
              actionData = value.slice("timezone|".length);
            } else if (typeof (value) === "string" && value.startsWith("datetime|")) {
              // console.log('datetime:', value);
              if (value === 'datetime|') {
                actionData = <Button onClick={() => {
                  setData({ [v]: `datetime|${new Date().toISOString()}` });
                }}>点击设置</Button>;
              } else {
                actionData = <Box>
                  <DateTimePicker
                    value={value.slice("datetime|".length)}
                    onChange={e => {
                      // console.log("e", e);
                      // 这里会改变到没有时区的类型
                      setData({ [v]: `datetime|${e.toISOString()}` });
                    }}
                  ></DateTimePicker>
                  <IconButton onClick={() => {
                    setData({ [v]: null });
                  }}>
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </Box>;
              }
            } else if (typeof (value) === "string" && value.startsWith("timedelta|")) {
              const val = value.slice("timedelta|".length);
              const unit = timedeltaUnit[v] ? timedeltaUnit[v] : Object.keys(timedeltaUnits)[0];
              actionData = <Box>
                <TextField value={`${parseFloat(val) / timedeltaUnits[unit]}`} onChange={e => {
                  if (isNaN(parseFloat(e.target.value))) return;
                  const newValue = `timedelta|${parseFloat(e.target.value) * timedeltaUnits[unit]}`;
                  setData({ [v]: newValue });
                }}></TextField>
                <Select value={unit}
                  onChange={e => {
                    setTimedeltaUnit(objectUpdate(timedeltaUnit, { [v]: e.target.value }));
                  }}>
                  {Object.keys(timedeltaUnits).map((key, k) => <MenuItem key={k} value={key}>
                    {key}
                  </MenuItem>)}
                </Select>
              </Box>
            } else {
              actionData = <TextField value={`${value}`} onChange={e => {
                const newValue = (typeof (value) === "number" ? parseFloat(e.target.value) : `${e.target.value}`);
                setData({ [v]: newValue });
              }}></TextField>;
            }
            return <ListItem key={k}>
              <ListItemText>{showName}</ListItemText>
              <ListItemSecondaryAction>
                {actionData}
              </ListItemSecondaryAction>
            </ListItem>;
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