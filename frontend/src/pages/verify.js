import React from "react"
import Container from '@material-ui/core/Container';
import { Box, Button, Checkbox, FormControlLabel, Link, List, ListItem, ListItemText, TextField, Typography } from "@material-ui/core";
import store from "../data/store";
import { AuthAPI } from '../api/api';

const authApi = new AuthAPI();

function Regist(props) {
  const [phone, setPhone] = React.useState(props.phone || '');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [password, setPassword] = React.useState(props.password || '');
  const [passwordRepeate, setPasswordRepeate] = React.useState(props.password || '');
  const [checked, setChecked] = React.useState(false);

  const handleRegist = () => {
    let user = { phone, name, address, email, password };
  };

  return (<Container maxWidth="sm">
    <Typography variant="h5">用户注册</Typography>
    <List>
      <ListItem>
        <TextField fullWidth variant="standard" label="手机号" helperText="手机号将作为登录依据，请勿遗忘。" onChange={e => {
          setPhone(e.target.value);
        }}></TextField>
      </ListItem>
      <ListItem>
        <TextField fullWidth variant="standard" type="password" label="密码" helperText="至少8位，包含数字和英文字符。" onChange={e => {
          setPassword(e.target.value);
        }}></TextField>
      </ListItem>
      <ListItem>
        <TextField fullWidth variant="standard" type="password" label="再次输入密码"
          error={Boolean((password && passwordRepeate) && (passwordRepeate !== password))}
          helperText={(password && passwordRepeate) && (passwordRepeate !== password) ? "两次输入密码不一致" : null} onChange={e => {
            setPasswordRepeate(e.target.value);
          }}></TextField>
      </ListItem>
      <ListItem>
        <TextField fullWidth variant="standard" label="地址" helperText="输入准确的地址有助于软件的使用。" onChange={e => {
          setAddress(e.target.value);
        }}></TextField>
      </ListItem>
      <ListItem>
        <TextField fullWidth variant="standard" label="电子邮件" helperText="可选，如果您想接收产品后续消息，请填写。" onChange={e => {
          setAddress(e.target.value);
        }}></TextField>
      </ListItem>
    </List>
    <FormControlLabel
      control={
        <Checkbox color="primary" onChange={e => setChecked(e.target.checked)}></Checkbox>
      }
      label="我已经阅读并同意"
    /><Link to="#!">用户协议</Link>
    <Box>
      <Button fullWidth disabled={!checked && password === passwordRepeate} variant="contained" color="primary" onClick={handleRegist}>注册</Button>
    </Box>
  </Container>);
}

function Verify(props) {
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authUntil, setAuthUntil] = React.useState('');
  const [requesting, setRequesting] = React.useState(false);
  const [captchaText, setCaptchaText] = React.useState("");
  if (!store.getState().config.data.auth) return <Regist></Regist>;
  return (<Container>

  </Container>);
}

export default Verify;