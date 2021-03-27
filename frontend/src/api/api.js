import { urlEncode } from "../utils/utils"

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
      add_timetable_node: "add/timetable_node",
      get_timetable_period: "get/timetable_period",
      add_timetable_period: "add/timetable_period",
      get_shop_info: "get/shop_info",
      get_reserve_date: 'get/reserve_date',
      get_reserve_table: 'get/reserve_table',
      logout: "logout",
      has_login: 'has_login',
    }
    this.request = this.request.bind(this);
    this.test = this.test.bind(this);
    this.get_ips = this.get_ips.bind(this);
  }
  async request(router, args, method = 'GET') {
    let js = {};
    if (method === 'GET') {
      js = await ((await fetch(this.url_base + router + (args ? "?" : "") + urlEncode(args), {
        method: 'GET',
        credentials: 'omit',
        // credentials: 'include',
        mode: 'cors'
      })).json());
    } else {
      js = await (await fetch(this.url_base + router, {
        body: JSON.stringify(args),
        method: 'POST',
        // 使用 include 会拖慢速度
        // credentials: 'include',
        credentials: 'omit',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
        },
      })).json();
    }
    if (js.code !== 200) {
      console.warn("Request responsed with code", js.code, 'message:', js.message, 'data:', js.data);
    }
    if (!(js.data.timetable_node || js.data.timetable_period))
      console.log('resp', js);
    // 过长的json可能不自动转换
    if (typeof (js) === 'string') {
      try {
        js = JSON.parse(js);
      } catch (e) {
        console.warn(e);
      }
    }
    return js;
  }
  async test() {
    return (await this.request(this.url.test)).data.test;
  }
  async logout() {
    return (await this.request(this.url.logout)).code;
  }
  async has_login() {
    return (await this.request(this.url.has_login)).data.has_login;
  }
  async get_ips() {
    return (await this.request(this.url.get_ips)).data.ips;
  }
  async get_timetable_node() {
    return (await this.request(this.url.get_timetable_node)).data.timetable_node;
  }
  async add_timetable_node(node) {
    return await this.request(this.url.add_timetable_node, node, 'POST');
  }
  async get_timetable_period() {
    return (await this.request(this.url.get_timetable_period)).data.timetable_period;
  }
  async add_timetable_period(period) {
    return await this.request(this.url.add_timetable_period, period, 'POST');
  }
  async get_shop_info() {
    return (await this.request(this.url.get_shop_info)).data.shop_info;
  }
  async get_reserve_date() {
    return (await this.request(this.url.get_reserve_date)).data.reserve_date;
  }
  async get_reserve_table(date) {
    // console.log('date', date);
    return (await this.request(this.url.get_reserve_table, { date: date })).data.reserve_table;
  }
}

export { API };