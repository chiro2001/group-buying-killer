import React from "react"
import Container from '@material-ui/core/Container';
import { MenuItem, FormControl, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, Select } from "@material-ui/core";
import store from "../data/store";
import { setConfig } from "../data/action";

function Settings(props) {
  const [themeName, setThemeName] = React.useState(store.getState().config.data.theme_name);
  return (<Container maxWidth="sm">
    <List>
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
              store.dispatch(setConfig(c));
              setTimeout(() => { window.location.reload(); }, 200);
            }}>
              {store.getState().config.data.theme_avaliable.map((v, k) => <MenuItem key={k} value={v}>{v}</MenuItem>)}
            </Select>
          </FormControl>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </Container>)
}

export default Settings;