import React from "react"
import Container from '@material-ui/core/Container';
import { Button, MenuItem, FormControl, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, Select, ListSubheader, Switch, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from "@material-ui/core";
import store from "../data/store";
import { setConfig, setErrorInfo, setMessage } from "../data/action";
import { funDownload } from "../utils/utils";

function Settings(props) {
  const [themeName, setThemeName] = React.useState(store.getState().config.data.theme_name);
  const refConfigFileInput = React.useRef();
  const [resetSettingsOpen, setResetSettingsOpen] = React.useState(false);
  const [deleteDataOpen, setDeleteDataOpen] = React.useState(false);

  const resetSettings = function() {
    let c = store.getState().config;
    c.data = c.data_default;
    c.save();
    c.load();
    store.dispatch(setConfig(c));
  }

  return (<Container maxWidth="md">
    <List>
      <ListSubheader>外观</ListSubheader>
      <ListItem>
        <ListItemText primary="主题设置"></ListItemText>
        <ListItemSecondaryAction>
          <FormControl>
            {/* <InputLabel></InputLabel> */}
            <Select value={themeName} onChange={e => {
              setThemeName(e.target.value);
              let c = store.getState().config;
              c.data.theme_name = e.target.value;
              c.theme = c.theme_avaliable[c.data.theme_name];
              c.save();
              store.dispatch(setConfig(c));
              setTimeout(() => { window.location.reload(); }, 200);
            }}>
              {store.getState().config.data.theme_avaliable.map((v, k) => <MenuItem key={k} value={v}>{v}</MenuItem>)}
            </Select>
          </FormControl>
        </ListItemSecondaryAction>
      </ListItem>
      <ListSubheader>数据管理</ListSubheader>
      <ListItem button onClick={() => {
        funDownload(store.getState().config.save(), `团购杀手配置数据(${new Date().toLocaleString()}).json`);
      }}>
        <ListItemText primary="数据导出"></ListItemText>
      </ListItem>
      <ListItem button onClick={() => {
        // console.log(refConfigFileInput)
        refConfigFileInput.current.click();
      }}>
        <ListItemText primary="数据导入"></ListItemText>
        <ListItemSecondaryAction>
          <input type="file" accept=".json" hidden name="file-gbk-data" ref={refConfigFileInput} onChange={e => {
            // console.log(e);
            let files = e.target.files;
            if (files.length === 0) {
              store.dispatch(setMessage("未选择文件"));
              return;
            }
            try {
              let file = files[0];
              let reader = new FileReader();
              reader.readAsText(file, 'UTF-8');
              reader.onload = evt => {
                const fileData = evt.target.result;
                try {
                  const js = JSON.parse(fileData);
                  if (!js.version_frontend) {
                    store.dispatch(setMessage("文件类型错误或者文件已经损坏"));
                    return;
                  }
                  if (js.version_frontend > store.getState().config.data.version_frontend) {
                    store.dispatch(setMessage(`存档文件版本(${js.version_frontend}高于当前版本${store.getState().config.data.version_frontend})，请更新到最新版`));
                    return;
                  }
                  let c = store.getState().config;
                  c.data = js;
                  store.dispatch(setConfig(c));
                  store.dispatch(setMessage("数据导入完成"));
                } catch (e) {
                  store.dispatch(setErrorInfo(e));
                }
              };
            } catch (e) {
              store.dispatch(setErrorInfo(e));
            }
          }}></input>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="数据同步(不可用)"></ListItemText>
        <ListItemSecondaryAction>
          <Switch disabled checked={false}></Switch>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={() => setResetSettingsOpen(true)}>
        <ListItemText primary="回到默认设置"></ListItemText>
      </ListItem>
      <ListItem button onClick={() => setDeleteDataOpen(true)}>
        <ListItemText primary="删除所有数据"></ListItemText>
      </ListItem>
      <ListSubheader>更新</ListSubheader>
      <ListItem button>
        <ListItemText primary="检查更新"></ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText primary="自动下载安装更新"></ListItemText>
        <ListItemSecondaryAction>
          <Switch disabled checked={false}></Switch>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
    <Dialog open={resetSettingsOpen} onClose={() => setResetSettingsOpen(false)}>
      <DialogTitle>
        回到默认设置
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">此操作将会清除所有设置数据，确认操作？</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setResetSettingsOpen(false)}>取消</Button>
        <Button onClick={() => {
          resetSettings();
          window.location.reload();
        }}>确定</Button>
      </DialogActions>
    </Dialog>
    <Dialog open={deleteDataOpen} onClose={() => setDeleteDataOpen(false)}>
      <DialogTitle>
        删除所有数据
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">此操作将会清除软件数据，确认操作？</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteDataOpen(false)}>取消</Button>
        <Button onClick={() => {
          resetSettings();
          window.location.reload();
        }}>确定</Button>
      </DialogActions>
    </Dialog>
  </Container>)
}

export default Settings;