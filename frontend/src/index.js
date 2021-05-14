import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './data/store';
import { Provider } from 'react-redux';
import { API, AuthAPI } from './api/api';
import { setConfig, setErrorInfo, setRoomStockPlans, setTimetableNodes, setTimetablePeriods } from './data/action';
import { sleep } from './utils/utils';

// 循环执行函数
async function cycleFunc(cycle = 1000) {
  const api = new API();
  const authApi = new AuthAPI();
  let authCount = 0;
  while (true) {
    try {
      await api.get_timetable_node().then(nodes => {
        if (nodes)
          store.dispatch(setTimetableNodes(nodes));
      });
      await api.get_timetable_period().then(periods => {
        if (periods)
          store.dispatch(setTimetablePeriods(periods));
      });
      // await api.get_room_stock_plan().then(stocks => {
      //   if (stocks)
      //     store.dispatch(setRoomStockPlans(stocks));
      // });
      // 循环验证
      /*
      if (authCount == 0) {
        if (window.location.pathname !== '/verify') {
          await authApi.auth(store.getState().config.data.auth).then((check) => {
            if (!check && window.location.pathname !== '/verify') {
              setTimeout(() => {
                window.location.pathname = '/verify';
              }, 2000);
              let c = store.getState().config;
              c.data.auth = '';
              store.dispatch(setConfig(c));
            }
          });
          authCount = 20;
        } else authCount = 1;
      }
      authCount--;
      */
    } catch (e) {
      console.error(e);
    }
    await sleep(cycle);
  }
}

// 开始执行的函数
async function startFunc() {
  const api = new API();
  setTimeout(async () => {
    let c = api.download_config();
    if (!c.settings_async) return;
    const config_frontend = await api.download_config();
    if (!config_frontend) {
      store.dispatch(setErrorInfo("同步设置失败"));
    }
    else store.dispatch(setConfig(config_frontend));
  }, 600);
}

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

startFunc().then(() => {
  cycleFunc();
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
