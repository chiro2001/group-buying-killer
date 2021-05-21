import React from 'react';
import "@fontsource/roboto";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AlarmIcon from '@material-ui/icons/Alarm';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import StorageIcon from '@material-ui/icons/Storage';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PhonelinkIcon from '@material-ui/icons/Phonelink';
import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from './data/store';
import { setConfig, setDaemon, setErrorInfo, setMessage, setReserveTableData, setRoomStockData, setShopInfo } from "./data/action";

import { isIterator, isMobileDevice, sleep } from "./utils/utils";
import { api } from "./api/api";

import ListItemLink from "./components/ListItemLink";
// import Launch from "./pages/launch";
import Settings from "./pages/Settings";
import './App.css';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, Snackbar } from '@material-ui/core';
import RemoteLogin from './pages/RemoteLogin';
import Login from './pages/Login';

const drawerWidth = 240;
moment.locale('zh-cn');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    // overflowX: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
  },
}));

// const api = new API();
// const authApi = new AuthAPI();
// api.get_shop_info().then(shopInfo => {
//   console.log('shopInfo', shopInfo);
//   if (shopInfo) store.dispatch(setShopInfo(shopInfo));
// }).catch(e => {
//   store.dispatch(setErrorInfo(e));
// })

let subscribers = {};

let last_data = {
  config: null,
  user: null,
  daemon: null
};

store.subscribe(async () => {
  let state = store.getState();
  // console.log('redux update to', state);
  // 保存 config
  if (state.config.data) {
    if (JSON.stringify(state.config.data) != JSON.stringify(last_data.config)) {
      // console.log('Config will change:', state.config.data);
      state.config.save();
      if (store.getState().user && store.getState().config.data.settings_async) {
        await api.request('sync', 'POST', { config: state.config.data });
      }
    } else {
      // console.log('Not change:', state.config.data);
    }
    last_data.config = state.config.data;
  }
  for (let subFunc in subscribers) {
    subscribers[subFunc](state);
  }
});

const getShopTitle = function () {
  return null;
  // TODO: get title
  if (!store.getState().shopInfo.shopName) return null;
  // console.log('getShopTitle', store.getState().shopInfo);
  return `${store.getState().shopInfo.shopName} - ${store.getState().shopInfo.branchName}`
}

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [popupLogin, setPopupLogin] = React.useState(false);
  const [errorDialogInfo, setErrorDialogInfo] = React.useState(false);
  const [myMessage, setMyMessage] = React.useState(null);
  const [hasLogin, setHasLogin] = React.useState(false);
  const titleDefault = "团购杀手 - KTV体验版";
  const [title, setTitle] = React.useState(getShopTitle() || titleDefault);
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

  // 拉大到800会打开，拉小到600关闭
  const triggerWidthOpen = 800;
  const triggerWidthClose = 600;

  // 注册一个当遇到错误的时候调用的钩子吧，用来显示错误信息
  subscribers['Error'] = function (state) {
    if (state.errorInfo) {
      console.log('Error Hook: ', state.errorInfo);
      setErrorDialogInfo(state.errorInfo);
      // 清空错误信息
      store.dispatch(setErrorInfo(null));
    }
  };
  // 注册一个消息钩子
  subscribers['Message'] = function (state) {
    if (state.message) {
      console.log('message: ', state.message);
      setMyMessage(state.message);
      store.dispatch(setMessage(null));
    }
  };
  // 店信息钩子
  subscribers['ShopInfo'] = function (state) {
    if (state.shopInfo) {
      if (title === titleDefault) {
        setTitle(getShopTitle());
      }
    }
  };
  subscribers['User'] = async function (state) {
    if (state.user) {
      if (JSON.stringify(state.user) != JSON.stringify(last_data.user)) {
        forceUpdate();
      }
      last_data.user = state.user;
      if (!state.daemon === null) {
        store.dispatch(setDaemon(false));
        const daemon = await api.request('remote_login', 'GET');
        if (daemon.code === 200 && daemon.data.uid) {
          store.dispatch(setDaemon(daemon.data));
        } else store.dispatch(setDaemon(null));
      }
    }
  };
  subscribers['Daemon'] = function (state) {
    if (state.daemon) {
      if (JSON.stringify(state.daemon) != JSON.stringify(last_data.daemon)) {
        forceUpdate();
      }
      last_data.daemon = state.daemon;
    }
  };
  // onMount & onUpdate
  React.useEffect(() => {
    const onWindowResize = () => {
      let width = window.innerWidth;
      // console.log(width);
      if (!open && width >= triggerWidthOpen) setOpen(true);
      if (open && width <= triggerWidthClose) setOpen(false);
    };
    window.addEventListener("load", onWindowResize);
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener("load", onWindowResize);
      window.removeEventListener("resize", onWindowResize);
    };
  });

  // console.log("store", store);
  // console.log("store.getState()", store.getState());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLoginOpen = () => {
    // console.log('handleLoginOpen');
    setPopupLogin(true);
  };

  const handleLoginClose = () => {
    setPopupLogin(false);
  };

  const handleClickAction = () => {
    if (window.innerWidth < 600 || window.location.pathname === '/') {
      setOpen(false);
    }
  };

  const mainContent = <Router>
    <MuiPickersUtilsProvider utils={MomentUtils} locale="zh-cn">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="login"
            onClick={handleLoginOpen}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List onClick={handleClickAction}>
          <ListItemLink to="/" primary="启动页" icon={<DashboardIcon />} />
          <ListItemLink to="/settings" primary="设置" icon={<SettingsIcon />} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path={"/"} exact={true}>
            {/* <Launch /> */}
            <div>
              Launch Here
          </div>
          </Route>
          <Route path={"/settings"} exact={false}>
            <Settings />
          </Route>
        </Switch>
      </main>
    </MuiPickersUtilsProvider>
  </Router>;

  const user = store.getState().user;
  const isNowLogining = !user && store.getState().config.data.api_token.access_token;
  let content = isNowLogining ? <Box>正在登录...</Box> : (user ? mainContent : <Login></Login>);
  if ((!isNowLogining && user) && !store.getState().daemon) {
    content = <RemoteLogin></RemoteLogin>
  }
  // console.log('app.js user', user, 'content', content);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={store.getState().config.theme}>
        {content}
        <Dialog open={errorDialogInfo ? true : false} onClose={() => { setErrorDialogInfo(null); }}>
          <DialogTitle>遇到错误</DialogTitle>
          <DialogContent>
            <Typography variant="body1">错误信息</Typography>
            <Box component="div">
              <Box component="div">
                {() => {
                  if (isIterator(errorDialogInfo) && typeof (errorDialogInfo) !== 'string') {
                    return <List>
                      {errorDialogInfo.map((d, i) => <ListItem key={i}>
                        <code>{JSON.stringify(d) === '{}' ? d.toString() : JSON.stringify(d)}</code>
                      </ListItem>)}
                    </List>;
                  } else {
                    return <code>{JSON.stringify(errorDialogInfo) === '{}' ? errorDialogInfo.toString() : JSON.stringify(errorDialogInfo)}</code>;
                  }
                }}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => { window.location.reload() }}>刷新</Button>
            <Button color="primary" onClick={() => { setErrorDialogInfo(null); }}>取消</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={myMessage !== null}
          autoHideDuration={6000}
          // onClose={(e) => { console.log(e); }}
          message={myMessage}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={() => setMyMessage(null)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </ThemeProvider>
    </div >
  );
}
