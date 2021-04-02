import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './data/store';
import { Provider } from 'react-redux';
import { API, AuthAPI } from './api/api';
import { setTimetableNodes, setTimetablePeriods } from './data/action';
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
      if (authCount == 0) {
        authApi.auth(store.getState().config.data.auth).then((check) => {
          if (!check && window.location.pathname !== '/verify') {
            window.location.pathname = '/verify';
          }
        });
        authCount = 20;
      }
      authCount--;
    } catch (e) {
      console.error(e);
    }
    await sleep(cycle);
  }
}

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

cycleFunc();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
