import { setErrorInfo } from "../data/action";
import store from "../data/store";
import { isIterator, urlEncode } from "../utils/utils"

const request = async function (url_base, router, args, method = 'GET') {
  let js = {};
  try {
    if (method === 'GET') {
      js = await ((await fetch(url_base + router + (args ? "?" : "") + urlEncode(args), {
        method: 'GET',
        credentials: 'omit',
        // credentials: 'include',
        mode: 'cors'
      })).json());
    } else {
      js = await (await new Promise((resolve, reject) => {
        fetch(url_base + router, {
          body: JSON.stringify(args),
          method: 'POST',
          // 使用 include 会拖慢速度
          // credentials: 'include',
          credentials: 'omit',
          mode: 'cors',
          headers: {
            'content-type': 'application/json',
          },
        }).then(data => {
          console.log('then', data);
          resolve(data);
        })
      })).json();
    }
  } catch (e) {
    console.log(e);
    if (isIterator(store.getState().errorInfo)) {
      let t = store.getState().errorInfo;
      t.push(e);
      setErrorInfo(t);
    } else setErrorInfo([e,]);
    throw e;
  }
  if (js.code !== 200) {
    console.warn("Request responsed with code", js.code, 'message:', js.message, 'data:', js.data);
    setErrorInfo(js);
  }
  try {
    // 忽略惯常消息
    if (!(js.data.timetable_node || js.data.timetable_period))
      console.log('resp', js);
    // 过长的json可能不自动转换..?
    if (typeof (js) === 'string') {
      try {
        js = JSON.parse(js);
      } catch (e) {
        console.warn(e);
      }
    }
    return js;
  } catch (e) {
    console.log(e);
    if (isIterator(store.getState().errorInfo)) {
      let t = store.getState().errorInfo;
      t.push(e);
      setErrorInfo(t);
    } else setErrorInfo([e,]);
    throw e;
  }
};

class API {
  constructor(props) {
    this.url_base = 'http://localhost:8000/api/v1/';
    // this.url_base = '/api/v1/';
    // this.url_base = 'http://localhost:12000/api/v1/';
    // this.url_base = 'http://localhost:8000/';
    // this.url_base = 'http://localhost:8001/';
    this.url = {
      test: 'test',
      get_ips: 'get/ips',
      get_timetable_node: "get/timetable_node",
      set_timetable_node: "set/timetable_node",
      get_timetable_period: "get/timetable_period",
      set_timetable_period: "set/timetable_period",
      get_shop_info: "get/shop_info",
      get_reserve_date: 'get/reserve_date',
      get_reserve_table: 'get/reserve_table',
      logout: "logout",
      has_login: 'has_login',
    }
    this.test = this.test.bind(this);
    this.get_ips = this.get_ips.bind(this);
    this.default_error_info = {
      code: 302,
      message: "网络错误",
      data: {},
    };
  }
  async test() {
    return (await request(this.url_base, this.url.test)).data;
  }
  async logout() {
    return (await request(this.url_base, this.url.logout)).code;
  }
  async has_login() {
    return (await request(this.url_base, this.url.has_login)).data.has_login;
  }
  async get_ips() {
    return (await request(this.url_base, this.url.get_ips)).data.ips;
  }
  async get_timetable_node() {
    return (await request(this.url_base, this.url.get_timetable_node)).data.timetable_node;
  }
  async set_timetable_node(node) {
    return await request(this.url_base, this.url.set_timetable_node, node, 'POST');
  }
  async get_timetable_period() {
    return (await request(this.url_base, this.url.get_timetable_period)).data.timetable_period;
  }
  async set_timetable_period(period) {
    return await request(this.url_base, this.url.set_timetable_period, period, 'POST');
  }
  async get_shop_info() {
    return (await request(this.url_base, this.url.get_shop_info)).data.shop_info;
  }
  async get_reserve_date() {
    return (await request(this.url_base, this.url.get_reserve_date)).data.reserve_date;
  }
  async get_reserve_table(date) {
    // console.log('date', date);
    return (await request(this.url_base, this.url.get_reserve_table, { date: date })).data.reserve_table;
  }
}

class AuthAPI {
  constructor(props) {
    // this.url_base = 'https://service-kfp3xte1-1254016670.sh.apigw.tencentcs.com/release/';
    this.url_base = 'http://localhost:8081/';
    this.url = {
      regist: 'user/regist',
      login: 'user/login',
      auth: 'user/auth',
      delete: 'user/delete',
      applyCaptcha: 'user/captcha/apply',
    };
    this.admin_url = 'http://gbk.chiro.work/';
  }
  async regist(user) {
    return await request(this.url_base, this.url.regist, user, 'GET');
  }
  async auth(auth) {
    return await request(this.url_base, this.url.auth, { auth }, 'GET').code === 200;
  }
  async login(phone, password) {
    return await request(this.url_base, this.url.login, { phone, password }, 'GET');
  }
  async applyCaptcha(phone, password, captcha) {
    return (await request(this.url_base, this.url.applyCaptcha, { phone, password, captcha }, 'GET'));
  }
}

export { API, AuthAPI };