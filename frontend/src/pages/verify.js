import React from "react"
import Container from '@material-ui/core/Container';
import PropType from 'prop-types'
import {
  Box, Button, Checkbox, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, FormControlLabel, Link, List,
  ListItem, ListItemText, makeStyles, TextField, Typography
} from "@material-ui/core";
import store from "../data/store";
import { AuthAPI } from '../api/api';
import { setConfig } from "../data/action";

const authApi = new AuthAPI();

const useStyles = makeStyles({
  linkAction: {
    padding: 5,
  }
});

function RegistComp(props) {
  const { onLogin } = props;
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
    /><Link >用户协议</Link>
    <List>
      <ListItem>
        <Button fullWidth disabled={!checked && password === passwordRepeate} variant="contained" color="primary" onClick={handleRegist}>注册</Button>
      </ListItem>
      {onLogin ? <ListItem><Button fullWidth variant="outlined" color="secondary" onClick={() => {
        if (onLogin) onLogin();
      }}>去登录</Button></ListItem> : undefined}
    </List>
  </Container>);
}

function CaptchaComp(props) {
  const { onSuccess, open, onClose, onError } = props;
  const [phone, setPhone] = React.useState(props.phone || "");
  const [password, setPassword] = React.useState(props.password || "");
  const [captcha, setCaptcha] = React.useState('');
  const handleCaptcha = async () => {
    const resp = await authApi.applyCaptcha(phone, password, captcha);
    if (resp.code !== 200) {
      onError(resp);
      return;
    }
    onSuccess(resp);
    onClose();
  };
  return (<Dialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>请输入验证码</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <List>
          <ListItem>
            <TextField defaultValue={phone} onChange={e => {
              setPhone(e.target.value);
            }} label="手机号"></TextField>
          </ListItem>
          <ListItem>
            <TextField defaultValue={password} type="password" onChange={e => {
              setPassword(e.target.value);
            }} label="密码"></TextField>
          </ListItem>
          <ListItem>
            <TextField defaultValue={captcha} onChange={e => {
              setCaptcha(e.target.value);
            }} label="验证码"></TextField>
          </ListItem>
        </List>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {
        handleCaptcha();
      }} color="primary" autoFocus>确定</Button>
      <Button onClick={() => {
        onClose();
      }} color="primary">取消</Button>
    </DialogActions>
  </Dialog>);
}

CaptchaComp.PropType = {
  onSuccess: PropType.func.isRequired,
  onError: PropType.func.isRequired,
  onClose: PropType.func.isRequired,
  open: PropType.bool.isRequired,
  phone: PropType.string
};

function LoginComp(props) {
  const classes = useStyles();
  const { onSuccess, onRegist } = props;
  const [phone, setPhone] = React.useState(store.getState().config.data.user.phone || '');
  const [password, setPassword] = React.useState('');
  const [requesting, setRequesting] = React.useState(false);
  const [errorData, setErrorData] = React.useState({});

  const [openCaptcha, setOpenCaptcha] = React.useState(false);
  const handleLogin = async () => {
    setRequesting(true);
    let loginData;
    try {
      loginData = await authApi.login(phone, password);
    } catch (e) {
      setRequesting(false);
      return;
    }
    const { auth } = loginData.data;
    setRequesting(false);
    if (!auth && loginData.code !== 200) {
      setErrorData(loginData);
      return;
    }
    if (!auth && loginData.code === 200) {
      setOpenCaptcha(true);
      return;
    }
    let c = store.getState().config;
    c.data.auth = auth;
    store.dispatch(setConfig(c));
    if (onSuccess)
      onSuccess();
  };
  return (<Container maxWidth="sm">
    <Typography variant="h5">用户登录</Typography>
    <List>
      <ListItem>
        <TextField fullWidth variant="standard" label="手机号" onChange={e => {
          setPhone(e.target.value);
        }}></TextField>
      </ListItem>
      <ListItem>
        <TextField fullWidth variant="standard" type="password" label="密码" onChange={e => {
          setPassword(e.target.value);
        }}></TextField>
      </ListItem>
      <ListItem>
        <Button fullWidth color="primary" disabled={requesting} variant="contained" onClick={handleLogin}>{requesting ? "正在登录" : "登录"}</Button>
      </ListItem>
      {onRegist ? <ListItem>
        <Button fullWidth color="secondary" disabled={requesting} variant="outlined" onClick={() => {
          if (onRegist) onRegist();
        }}>注册</Button>
      </ListItem> : undefined}
    </List>
    <Box>
      <Link className={classes.linkAction}>忘记密码</Link>
      <Link className={classes.linkAction} onClick={() => setOpenCaptcha(true)}>输入验证码</Link>
    </Box>
    <Dialog
      open={JSON.stringify(errorData) !== '{}'}
      onClose={() => setErrorData({})}
    >
      <DialogTitle>遇到错误({errorData.code})</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {errorData.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setErrorData({})} color="primary" autoFocus>我知道了</Button>
      </DialogActions>
    </Dialog>
    {openCaptcha ? <CaptchaComp open={openCaptcha}
      onClose={() => { setOpenCaptcha(false); }}
      onSuccess={resp => {
        console.log(resp);
      }}
      onError={err => {
        setOpenCaptcha(false);
        setErrorData(err);
      }}
      phone={phone}
      password={password}></CaptchaComp> : undefined}
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
  const [pageType, setPageType] = React.useState('login');
  if (!store.getState().config.data.auth && pageType === 'login')
    return <LoginComp onRegist={() => { setPageType('regist'); }}></LoginComp>;
  if (!store.getState().config.data.auth && pageType === 'regist')
    return <RegistComp onLogin={() => { setPageType('login'); }}></RegistComp>;
  return (<Container>

  </Container>);
}

export default Verify;