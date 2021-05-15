import React from "react"
import Container from '@material-ui/core/Container';
import { Button, MenuItem, FormControl, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, Select, ListSubheader, Switch, Dialog, DialogTitle, DialogContent, Typography, DialogActions, FormControlLabel, Checkbox, Divider, Box, Grid, TextField } from "@material-ui/core";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import store from "../data/store";
import { setConfig, setErrorInfo, setMessage } from "../data/action";
import { funDownload } from "../utils/utils";
import { API } from "../api/api";

const api = new API();

function Predicts(props) {
  const [useSpan, setUseSpan] = React.useState(false);
  const labels = ['小包最低价', '小包最高价', '中包最低价', '中包最高价', '大包最低价', '大包最高价'];
  const [predictsResult, setPredictsResult] = React.useState(null);
  const defaultValues = [
    ['66', '76'], ['76', '86'], ['86', '96'], ['96', '106'], ['116', '126'], ['126', '146']
  ]
  const labelsTemp = labels.map((v, k) => {
    return { [v]: defaultValues[k] };
  });
  const labelValues = ((() => {
    let temp = {};
    for (const item of labelsTemp)
      for (const k in item)
        temp[k] = item[k];
    return temp;
  })());
  // console.log(labelValues);
  const [inputValues, setInputValues] = React.useState(labelValues);
  const getTempValues = () => {
    let tempValues = {};
    for (const k in inputValues) tempValues[k] = inputValues[k];
    return tempValues;
  }

  const items = labels.map((v, k) => {
    return useSpan ?
      <ListItem key={k}>
        <ListItemText primary={v}></ListItemText>
        <ListItemSecondaryAction>
          <Box>
            <TextField value={inputValues[v][0]} onChange={e => {
              let tmp = getTempValues();
              tmp[v][0] = e.target.value;
              setInputValues(tmp);
            }}></TextField>~
            <TextField value={inputValues[v][1]} onChange={e => {
              let tmp = getTempValues();
              tmp[v][1] = e.target.value;
              setInputValues(tmp);
            }}></TextField>
          </Box>
        </ListItemSecondaryAction>
      </ListItem> :
      <ListItem key={k}>
        <ListItemText primary={v}></ListItemText>
        <ListItemSecondaryAction>
          <TextField fullWidth value={inputValues[v][0]} onChange={e => {
            let tmp = getTempValues();
            tmp[v][0] = e.target.value;
            setInputValues(tmp);
          }}></TextField>
        </ListItemSecondaryAction>
      </ListItem>;
  });
  const content = <List>
    {items}
  </List>;
  const handlePredicts = () => {
    // 检查数据
    let tempValues = getTempValues();
    if (!useSpan)
      for (const k in tempValues)
        tempValues[k] = [tempValues[k][0],]
    for (const k in tempValues) {
      for (let i = 0; i < tempValues[k].length; i++) {
        let val = null;
        try {
          val = parseFloat(tempValues[k][i]);
        } catch (e) {
          store.dispatch(setErrorInfo(`数值错误: ${tempValues[k][i]}, ${e}`));
          return;
        }
        if (!val && val !== 0) {
          store.dispatch(setErrorInfo(`数值错误: ${tempValues[k][i]}`));
          return;
        }
        tempValues[k][i] = val;
      }
    }
    // console.log(JSON.stringify(tempValues));
    api.predicts(tempValues).then(d => {
      console.log(d);
      setPredictsResult(d.data);
    });
  };
  const result = !predictsResult ? null : <Table>
  <TableBody>
    {useSpan ? <TableRow>
      <TableCell align="center" colSpan={2}>预测曝光人数</TableCell>
      <TableCell align="center" colSpan={2}>预测访问人数</TableCell>
      <TableCell align="center" colSpan={2}>预测下单人数</TableCell>
    </TableRow> : <TableRow>
      <TableCell align="center">预测曝光人数</TableCell>
      <TableCell align="center">预测访问人数</TableCell>
      <TableCell align="center">预测下单人数</TableCell>
    </TableRow>}
    {useSpan ? <TableRow>
      <TableCell align="center">{parseInt(predictsResult['visible'][0])}</TableCell>
      <TableCell align="center">{parseInt(predictsResult['visible'][1])}</TableCell>
      <TableCell align="center">{parseInt(predictsResult['visit'][0])}</TableCell>
      <TableCell align="center">{parseInt(predictsResult['visit'][1])}</TableCell>
      <TableCell align="center">{parseInt(predictsResult['order'][0])}</TableCell>
      <TableCell align="center">{parseInt(predictsResult['order'][1])}</TableCell>
    </TableRow> : <TableRow>
      <TableCell align="center">{parseInt(predictsResult['visible'][0])}</TableCell>
      <TableCell align="center">{parseInt(predictsResult['visit'][0])}</TableCell>
      <TableCell align="center">{parseInt(predictsResult['order'][0])}</TableCell>
    </TableRow>}
  </TableBody>
</Table>;
  return (<Container maxWidth="sm">
    <Typography variant="h4">根据标准数据集预测</Typography>
    <FormControlLabel control={<Checkbox onChange={e => {
      setUseSpan(e.target.checked);
      setPredictsResult(null);
    }} checked={useSpan} color="secondary" />} label="使用数据区间" />
    <Divider></Divider>
    {content}
    <Button fullWidth variant="contained" color="secondary" onClick={handlePredicts}>预测</Button>
    <Divider></Divider>
    {result}
  </Container>)
}

export default Predicts;