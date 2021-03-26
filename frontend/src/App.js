import React from 'react';
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
import StorageIcon from '@material-ui/icons/Storage';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PhonelinkIcon from '@material-ui/icons/Phonelink';
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/zh-cn'
import store from './data/store'

import { isMobileDevice } from "./utils/utils"
import { API } from "./api/api"

import ListItemLink from "./components/listItemLink"
import LoginDialog from "./pages/loginDialog"
import Launch from "./pages/launch"
import Settings from "./pages/settings"
import Verify from "./pages/verify"
import PlanTime from "./pages/planTime"
import PlanStock from "./pages/planStock"
import Connect from "./pages/connect"

import './App.css';

const drawerWidth = 240;
moment.locale('zh-cn');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [popupLogin, setPopupLogin] = React.useState(false);

  // 拉大到800会打开，拉小到600关闭
  const triggerWidthOpen = 800;
  const triggerWidthClose = 600;

  const api = new API();

  // onMount
  React.useEffect(() => {
    const onWindowResize = () => {
      let width = window.innerWidth;
      console.log(width);
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
    if (window.innerWidth < 600) {
      setOpen(false);
    }
  };

  return (
    <div className={classes.root}>
      <Provider store={store}>
        <ThemeProvider theme={store.getState().config.theme}>
          <Router>
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
                    团购杀手 - KTV体验版
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
                  <ListItemLink to="/plan/time" primary="时间计划" icon={<AlarmIcon />} />
                  <ListItemLink to="/plan/stock" primary="库存计划" icon={<StorageIcon />} />
                  <ListItemLink to="/settings" primary="设置" icon={<SettingsIcon />} />
                  <ListItemLink to="/verify" primary="授权" icon={<VerifiedUserIcon />} />
                  {isMobileDevice() ? null : <ListItemLink to="/connect" primary="移动设备" icon={<PhonelinkIcon />} />}
                </List>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* <Route render={({ location }) => {
                  console.log('location', location);
                  return (
                    <TransitionGroup>
                      <CSSTransition
                        key={location.key}
                        classNames='fade2'
                        timeout={0}
                      >
                        <Switch>
                          <Route path={"/"} exact={true}>
                            <Launch config={store.getState().config} />
                          </Route>
                          <Route path={"/plan/time"} exact={false}>
                            <PlanTime config={store.getState().config} />
                          </Route>
                          <Route path={"/plan/stock"} exact={false}>
                            <PlanStock config={store.getState().config} />
                          </Route>
                          <Route path={"/settings"} exact={false}>
                            <Settings config={store.getState().config} />
                          </Route>
                          <Route path={"/verify"} exact={false}>
                            <Verify config={store.getState().config} />
                          </Route>
                          <Route path={"/connect"} exact={false}>
                            <Connect config={store.getState().config} />
                          </Route>
                        </Switch>
                      </CSSTransition>
                    </TransitionGroup>
                  );
                }}>
                </Route> */}
                <Switch>
                  <Route path={"/"} exact={true}>
                    <Launch config={store.getState().config} />
                  </Route>
                  <Route path={"/plan/time"} exact={false}>
                    <PlanTime config={store.getState().config} />
                  </Route>
                  <Route path={"/plan/stock"} exact={false}>
                    <PlanStock config={store.getState().config} />
                  </Route>
                  <Route path={"/settings"} exact={false}>
                    <Settings config={store.getState().config} />
                  </Route>
                  <Route path={"/verify"} exact={false}>
                    <Verify config={store.getState().config} />
                  </Route>
                  <Route path={"/connect"} exact={false}>
                    <Connect config={store.getState().config} />
                  </Route>
                </Switch>
              </main>
            </MuiPickersUtilsProvider>
          </Router>
          <LoginDialog config={store.getState().config} open={popupLogin && store.getState().config.has_login} onClose={handleLoginClose}></LoginDialog>
        </ThemeProvider>
      </Provider>
    </div>
  );
}
