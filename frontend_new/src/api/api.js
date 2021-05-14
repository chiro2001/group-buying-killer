import { setErrorInfo } from "../data/action";
import store from "../data/store";
import { isIterator, urlEncode } from "../utils/utils"

// const request = async function (url_base, router, args, method = 'GET') {
//   let js = {};
//   try {
//     if (method === 'GET') {
//       js = await ((await fetch(url_base + router + (args ? "?" : "") + urlEncode(args), {
//         method: 'GET',
//         credentials: 'omit',
//         // credentials: 'include',
//         mode: 'cors'
//       })).json());
//     } else {
//       js = await (await new Promise((resolve, reject) => {
//         fetch(url_base + router, {
//           body: JSON.stringify(args),
//           method: 'POST',
//           // 使用 include 会拖慢速度
//           // credentials: 'include',
//           credentials: 'omit',
//           mode: 'cors',
//           headers: {
//             'content-type': 'application/json',
//           },
//         }).then(data => {
//           // console.log('then', data);
//           resolve(data);
//         })
//       })).json();
//     }
//   } catch (e) {
//     console.log(e);
//     // if (isIterator(store.getState().errorInfo)) {
//     //   let t = store.getState().errorInfo;
//     //   t.push(e);
//     //   setErrorInfo(t);
//     // } else setErrorInfo([e,]);
//     store.dispatch(setErrorInfo(e));
//     throw e;
//   }
//   if (js.code !== 200) {
//     console.warn("Request responsed with code", js.code, 'message:', js.message, 'data:', js.data);
//     store.dispatch(setErrorInfo(js));
//   }
//   try {
//     // 忽略惯常消息
//     if (!(js.data.timetable_node || js.data.timetable_period || js.data.room_stock_plan))
//       console.log('resp', js);
//     // 过长的json可能不自动转换..?
//     if (typeof (js) === 'string') {
//       try {
//         js = JSON.parse(js);
//       } catch (e) {
//         console.warn(e);
//         store.dispatch(setErrorInfo(e));
//         return null;
//       }
//     }
//     return js;
//   } catch (e) {
//     console.log(e);
//     // if (isIterator(store.getState().errorInfo)) {
//     //   let t = store.getState().errorInfo;
//     //   t.push(e);
//     //   setErrorInfo(t);
//     // } else setErrorInfo([e,]);
//     store.dispatch(setErrorInfo(e));
//     throw e;
//   }
// };

// class API {
//   constructor(props) {
//     this.url_base = `http://localhost:${window.location.port}/api/v1/`;
//     // this.url_base = '/api/v1/';
//     // this.url_base = 'http://localhost:12000/api/v1/';
//     // this.url_base = 'http://localhost:8000/';
//     // this.url_base = 'http://localhost:8001/';
//     this.url = {
//       test: 'test',
//       get_ips: 'get/ips',
//       get_timetable_node: "get/timetable_node",
//       set_timetable_node: "set/timetable_node",
//       delete_timetable_node: "delete/timetable_node",
//       get_timetable_period: "get/timetable_period",
//       set_timetable_period: "set/timetable_period",
//       delete_timetable_period: "delete/timetable_period",
//       get_room_stock_plan: "get/room_stock_plan",
//       set_room_stock_plan: "set/room_stock_plan",
//       delete_room_stock_plan: "delete/room_stock_plan",
//       delete_tid: "delete/tid",
//       get_shop_info: "get/shop_info",
//       get_reserve_date: 'get/reserve_date',
//       get_reserve_table: 'get/reserve_table',
//       upload_config: "upload/config",
//       download_config: "download/config",
//       logout: "logout",
//       has_login: 'has_login',
//     }
//     this.test = this.test.bind(this);
//     this.get_ips = this.get_ips.bind(this);
//     this.default_error_info = {
//       code: 302,
//       message: "网络错误",
//       data: {},
//     };
//   }
//   async test() {
//     return (await request(this.url_base, this.url.test)).data;
//   }
//   async logout() {
//     return (await request(this.url_base, this.url.logout)).code;
//   }
//   async has_login() {
//     return (await request(this.url_base, this.url.has_login)).data.has_login;
//   }
//   async get_ips() {
//     return (await request(this.url_base, this.url.get_ips)).data.ips;
//   }
//   async get_timetable_node() {
//     return (await request(this.url_base, this.url.get_timetable_node)).data.timetable_node;
//   }
//   async set_timetable_node(node) {
//     return await request(this.url_base, this.url.set_timetable_node, node, 'POST');
//   }
//   async get_timetable_period() {
//     return (await request(this.url_base, this.url.get_timetable_period)).data.timetable_period;
//   }
//   async set_timetable_period(period) {
//     return await request(this.url_base, this.url.set_timetable_period, period, 'POST');
//   }
//   async get_room_stock_plan() {
//     return (await request(this.url_base, this.url.get_room_stock_plan)).data.room_stock_plan;
//   }
//   async set_room_stock_plan(stock) {
//     return await request(this.url_base, this.url.set_room_stock_plan, stock, 'POST');
//   }
//   async delete_tid(tid) {
//     return await request(this.url_base, this.url.delete_tid + '/' + tid);
//   }

//   async get_shop_info() {
//     return (await request(this.url_base, this.url.get_shop_info)).data.shop_info;
//   }
//   async get_reserve_date() {
//     return (await request(this.url_base, this.url.get_reserve_date)).data.reserve_date;
//   }
//   async get_reserve_table(date) {
//     // console.log('date', date);
//     return (await request(this.url_base, this.url.get_reserve_table, { date: date })).data.reserve_table;
//   }
//   async upload_config() {
//     return (await request(this.url_base, this.url.upload_config, store.getState().config.data, 'POST'));
//   }
//   async download_config() {
//     return (await request(this.url_base, this.url.download_config)).data.config_frontend;
//   }
// }

// class AuthAPI {
//   constructor(props) {
//     this.url_base_remote = 'https://service-kfp3xte1-1254016670.sh.apigw.tencentcs.com/release/';
//     this.url_base_local = 'http://localhost:8081/';
//     this.url_base = window.location.port === 80 ? this.url_base_remote : this.url_base_local;
//     this.url = {
//       regist: 'user/regist',
//       login: 'user/login',
//       auth: 'user/auth',
//       delete: 'user/delete',
//       applyCaptcha: 'user/captcha/apply',
//     };
//     this.admin_url = 'http://gbk.chiro.work/';
//   }
//   async regist(user) {
//     return await request(this.url_base, this.url.regist, user, 'GET');
//   }
//   async auth(auth) {
//     return await request(this.url_base, this.url.auth, { auth }, 'GET').code === 200;
//   }
//   async login(phone, password) {
//     return await request(this.url_base, this.url.login, { phone, password }, 'GET');
//   }
//   async applyCaptcha(phone, password, captcha) {
//     return (await request(this.url_base, this.url.applyCaptcha, { phone, password, captcha }, 'GET'));
//   }
// }

// export { API, AuthAPI };

class API {
  constructor() {
    this.host = '127.0.0.1';
    this.port = 8080;
    this.api_version = "v2";
    this.api_prefix = `/api/${this.api_version}`;
    this.protocol = 'http'
    this.url = `${this.protocol}://${this.host}:${this.port}${this.api_prefix}`;
    this.access_token = '';
    this.refresh_token = '';
  }
  set_token(access_token, refresh_token) {
    // this.access_token = access_token || this.access_token;
    // this.refresh_token = refresh_token || this.refresh_token;
    if (access_token !== undefined)
      this.access_token = access_token;
    if (refresh_token !== undefined)
      this.refresh_token = refresh_token;
  }
  request_key(router, key, method = "GET", data) {
    return this.request(`${router}/${key}`, method, data);
  }
  get_headers(refresh = false, access = true) {
    let headers = {
      'Content-Type': 'application/json',
    };
    if (refresh) {
      headers['Refresh'] = this.refresh_token;
    }
    if (access) {
      if (this.access_token !== '') headers['Authorization'] = this.access_token;
    }
    return headers;
  }
  async request(router, method = "GET", data) {
    const payload = {
      method: method,
      // mode: 'cors',
      body: data ? JSON.stringify(data) : undefined,
      // 注销的时候自带 refresh_token
      headers: this.get_headers(Boolean(router === 'session' && method === 'DELETE')),
    };
    // console.log('request', router, method, data, payload);
    const resp = await fetch(`${this.url}/${router}`, payload);
    let js = null;
    try { js = await resp.json(); } catch (e) {
      console.error(e);
      store.dispatch(setErrorInfo(e));
      return { code: resp.status, error: resp.statusText };
    }
    console.log('raw js:', js);
    if (!js) {
      // console.log(await resp.json());
      js = {};
      js.message = resp.statusText;
    }
    if (js.code === undefined) js.code = resp.status;
    if (js.code === 422) {
      if (this.refresh_token === '') {
        // 过期勒
        return null;
      }
      // ac_token到期，准备更新
      // console.log(this.get_headers(true));
      const resp2 = await fetch(`${this.url}/session`, {
        method: 'GET',
        // mode: 'cors',
        headers: this.get_headers(true),
        // body: JSON.stringify({ refresh_token: this.refresh_token })
      });
      try {
        const js2 = await resp2.json();
        // console.log('updating ac_token', js2);
        if (js2.code === 200) {
          this.set_token(js2.data.access_token, js2.data.refresh_token);
        }
        else {
          // 判定为 update_token 也过期，要求重新登录
          store.dispatch(setErrorInfo("登录过期，请重新登录"));
          return null;
        }
      } catch (e) {
        // console.error(e);
        return { code: resp2.status, error: resp2.statusText };
      }
      return this.request(router, method, data);
    }
    if (js.code === 200) {
      // 登录自动储存 JWT 数据
      if (router === 'session' && method === 'POST') {
        const { access_token, refresh_token } = js.data;
        // console.log('jwt', access_token, refresh_token);
        this.set_token(access_token, refresh_token);
      } else if (router === 'session' && method === 'DELETE') {
        // 注销
        // console.warn('注销');
        this.set_token('', '');
      }
    }
    return js;
  }
}

const api = new API();

export { API, api };