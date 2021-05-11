const fetch = require("node-fetch");

const sleep = (millseconds) => {
  return new Promise(resolve => {
    setTimeout(resolve, millseconds);
  });
};

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

(async () => {
  const api = new API();

  let resp = null;

  // resp = await api.request('user', 'POST', {
  //   username: 'chiro', password: '1234'
  // });
  // console.log(resp);
  resp = await api.request('drop_data', 'GET');
  console.log('drop_data', resp);
  // await sleep(2000);
  resp = await api.request('session', 'POST', {
    username: 'chiro', password: '1352040930lxr'
  });
  console.log('login', resp);
  // await sleep(2000);
  resp = await api.request('password', 'POST', { password: "1234" });
  console.log('update password', resp);
  // await sleep(2000);
  resp = await api.request('session', 'POST', {
    username: 'chiro', password: '1234'
  });
  console.log('re login', resp);
  resp = await api.request('session', 'DELETE');
  console.log('logout', resp);
  resp = await api.request('password', 'POST', { password: "1234" });
  console.log('try to update password', resp);
})();