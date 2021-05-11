import React from 'react';

const api = window.location.port !== '' ? 'http://localhost:8081' : (process.env.apiUrl ? process.env.apiUrl : 'https://service-kfp3xte1-1254016670.sh.apigw.tencentcs.com/release');

function urlEncode_(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode_(param[i], k, encode);
    }
  }
  return paramStr;
};

function urlEncode(param) {
  let paramStr = urlEncode_(param, undefined, true);
  if (paramStr.length > 0 && paramStr[0] === '&') paramStr = paramStr.slice(1);
  return paramStr;
};

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

function generateCaptcha(length = 8) {
  return Math.random().toString(36).slice(-length).toUpperCase();
}

function LoginBox(props) {
  const { onClose, setInfo, request } = props;
  const [adminPasswd, setAdminPasswd] = React.useState(localStorage.getItem('gbk-admin-passwd') || '');
  const handleLogin = async () => {
    console.log(adminPasswd);
    setInfo({ level: 'debug', data: '正在验证管理员密码...' });
    request(api + '/admin/check', {
      admin_passwd: adminPasswd
    }, () => {
      localStorage.setItem('gbk-admin-passwd', adminPasswd);
      onClose(adminPasswd);
    });
  };
  return (
    <div className="app" style={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
      <h3>管理员登录</h3>
      输入管理员密码: <input autoFocus style={{ maxWidth: 200 }} type="password" defaultValue={adminPasswd} onChange={(e) => {
        setAdminPasswd(e.target.value);
      }} onKeyDown={(e) => {
        if (e.code === 'Enter') handleLogin();
      }}></input>
      <button style={{ maxWidth: 200 }} onClick={handleLogin}>确定</button>
    </div>
  );
}

function App() {
  const [adminPasswd, setAdminPasswd] = React.useState("");
  const [hasLogin, setLogin] = React.useState(false);
  const [info, setInfo] = React.useState(null);
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [auth, setAuth] = React.useState('');
  const [authUntil, setAuthUntil] = React.useState('');
  const [userList, setUserList] = React.useState([]);
  const [requesting, setRequesting] = React.useState(false);
  const [captchaDatas, setCaptchaDatas] = React.useState([]);
  const [captchaTime, setCaptchaTime] = React.useState('');


  const User = function (props) {
    const { user, onDetailed } = props;
    if (!user) return null;
    return (<table border="1" style={{ width: '100%', maxWidth: 350 }}>
      <tbody>
        <tr>
          <td>{user.phone || "(电话)"}</td>
          <td>{user.name || "(名称)"}</td>
          <td>{user.email || "(电子邮件)"}</td>
        </tr>
        <tr>
          <td>{user.address || "(地址)"}</td>
          <td>{user.auth ? ("可用时间: " + ((user.authUntil) ? user.authUntil.slice(0, 10) : "永久")) : "(不可用)"}</td>
          <td>{onDetailed ? <button onClick={() => {
            if (onDetailed)
              onDetailed(user);
          }} disabled={requesting}>修改</button> : undefined}</td>
        </tr>
      </tbody>
    </table>);
  };
  const requestIgnoreInfo = JSON.stringify([
    "/admin/users",
  ]);
  const start = async (passwd) => {
    setInfo(null);
    setLogin(true);
    setAdminPasswd(passwd);
    await updateUserList(passwd);
    await updateCaptchaDatas(passwd);
  };
  const request = async (url, data, onSuccess, method = 'GET') => {
    try {
      setRequesting(true);
      let result = null;
      if (method === 'GET') {
        result = await fetch(url + (data ? "?" : "") + urlEncode(data), {
          // method: 'POST',
          method: 'GET',
          // credentials: 'include',
          // credentials: 'omit',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Methods': 'GET, POST'
          },
          mode: 'cors',
          // body: JSON.stringify(data)
        });
      } else {
        result = await fetch(url, {
          method: 'POST',
          // method: 'GET',
          // credentials: 'include',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Methods': 'GET, POST'
          },
          mode: 'cors',
          body: JSON.stringify(data)
        });
      }

      setRequesting(false);
      result = await result.json();
      console.log('response', result);
      if (result.code === 200) {
        if (!requestIgnoreInfo.includes(url.slice(api.length)))
          setInfo({
            level: 'info', data: {
              code: result.code,
              message: result.message
            }
          });
        if (onSuccess)
          onSuccess(result);
      } else {
        setInfo({ level: 'error', data: result });
        await sleep(500);
      }
    } catch (e) {
      setRequesting(false);
      setInfo({ level: 'error', data: e.message });
      await sleep(500);
    }
  };
  const handleAddAuth = async () => {
    setInfo({ level: 'debug', data: '正在添加Auth...' });
    await sleep(500);
    await request(api + '/admin/authUser', {
      admin_passwd: adminPasswd,
      phone: phone
    });
    setInfo({ level: 'debug', data: '完成' });
    await updateUserList();
  };
  const handleUpdateAuthUntil = async () => {
    setInfo({ level: 'debug', data: '正在更新AuthUntil...' });
    await sleep(500);
    console.log(authUntil);
    await request(api + '/admin/authUntil', {
      admin_passwd: adminPasswd,
      phone: phone,
      time: authUntil,
    });
    setInfo({ level: 'debug', data: '完成' });
    await updateUserList();
  };
  const handleAddCaptchas = async (count = 10) => {
    setInfo({ level: 'debug', data: '正在添加captchaDatas...' });
    await sleep(500);
    console.log(captchaTime, count);
    let captchaDatas = [];
    for (let i = 0; i < count; i++) {
      captchaDatas.push({
        captcha: generateCaptcha(),
        authUntil: captchaTime
      });
    }
    await request(api + '/admin/captcha/add', {
      admin_passwd: adminPasswd,
      captcha: captchaDatas
    }, () => {
      setInfo({ level: 'debug', data: '完成' });
    }, 'POST');
    await updateCaptchaDatas();
  };
  const handleRegist = async () => {
    setInfo({ level: 'debug', data: '正在注册用户...' });
    await sleep(500);
    await request(api + '/user/regist', {
      name: name,
      password: password,
      email: email,
      phone: phone,
      address: address
    }, () => {
      setInfo({ level: 'debug', data: '完成' });
    });
    await updateUserList();
  };
  const handleDelete = async () => {
    setInfo({ level: 'debug', data: '正在删除用户...' });
    await sleep(500);
    await request(api + '/admin/user/delete', {
      phone: phone,
      admin_passwd: adminPasswd
    });
    setInfo({ level: 'debug', data: '完成' });
    setPhone('');
    setPassword('');
    setAddress('');
    setEmail('');
    setAuth('');
    await updateUserList();
  };
  const updateUserList = async (passwd) => {
    if (!passwd) passwd = adminPasswd;
    // setInfo({ level: 'debug', data: '正在更新用户列表' });
    await sleep(500);
    await request(api + '/admin/users', {
      admin_passwd: passwd
    }, (resp) => {
      let users = resp.data.users.map(user => {
        user.authUntil = user.authuntil;
        return user;
      });
      console.log('users', users);
      setUserList(users);
      // setInfo({ level: 'debug', data: '完成' });
    });
  };
  const updateCaptchaDatas = async (passwd) => {
    if (!passwd) passwd = adminPasswd;
    setInfo({ level: 'debug', data: '正在更新验证码列表' });
    await sleep(500);
    await request(api + '/admin/captcha', {
      admin_passwd: passwd
    }, (resp) => {
      const captchas = resp.data.captchaDatas.map(cap => {
        cap.authUntil = cap.authuntil;
        return cap;
      });
      console.log('captchas', captchas);
      setCaptchaDatas(captchas);
      setInfo({ level: 'debug', data: '完成' });
    });
  };
  const deleteCaptcha = async (captchas) => {
    if (!captchas) return;
    setInfo({ level: 'info', data: '正在删除验证码...' });
    await sleep(500);
    for (const c of captchas) {
      setInfo({ level: 'info', data: `正在删除${c}...` });
      await request(api + '/admin/captcha/delete', {
        admin_passwd: adminPasswd,
        captcha: c
      }, (resp) => {
        setInfo({ level: 'debug', data: resp.message });
      });
    }
    // setInfo({ level: 'debug', data: '完成' });
  };
  const content = <div>
    <div>
      <h4>用户列表</h4>
      <div>
        {userList.map((user, i) => <User user={user} key={i} onDetailed={user => {
          setPhone(user.phone || "");
          setName(user.name || "");
          setEmail(user.email || "");
          setAddress(user.address || "");
          setPassword(user.password || "");
          setAuth(user.auth || "");
          setAuthUntil(user.authUntil || "");
          // document.querySelector("#input-auth-until").value = user.authUntil;
        }}></User>)}
      </div>
    </div>
    <div>
      <h4>用户操作</h4>
      <div>
        <div>
          <b>用户信息</b><br />
            电话号码: <input defaultValue={phone} onChange={e => setPhone(e.target.value)}></input><br />
            名称: <input defaultValue={name} onChange={e => setName(e.target.value)}></input><br />
            电子邮件: <input defaultValue={email} onChange={e => setEmail(e.target.value)}></input><br />
            地址: <input defaultValue={address} onChange={e => setAddress(e.target.value)}></input><br />
            密码: <input defaultValue={password} onChange={e => setPassword(e.target.value)}></input><br />
        </div>
        <div>
          <button disabled={requesting} onClick={() => { }}>保存信息</button>
        </div>
      </div>
      <div>
        <b>授权操作</b><br />
          Auth: <input defaultValue={auth} disabled></input><br />
          Auth有效期: <input value={authUntil} id="input-auth-until" onChange={e => {
          setAuthUntil(e.target.value);
        }} type="date"></input><br />
      </div>
      <div>
        <button disabled={requesting} onClick={handleRegist}>注册用户</button>
        <button disabled={requesting} onClick={handleAddAuth}>增加授权</button>
        <button disabled={requesting} onClick={handleUpdateAuthUntil}>更新授权有效期</button>
        <button disabled={requesting} onClick={handleDelete}>删除用户</button>
      </div>
    </div>
    <div>
      <h4>验证码操作</h4>
      <div>
        <b>验证码列表</b><br />
        {captchaDatas.map((captchaData, i) => <div key={i}>
          <table border="1" style={{ width: '100%', maxWidth: 350 }}>
            <tbody>
              <tr>
                <td>{captchaData.captcha}</td>
                <td>{captchaData.authUntil ? <span>使用期限:{new Date(captchaData.authUntil).toDateString()}</span> : "永久"}</td>
                <td><button onClick={async () => {
                  await deleteCaptcha(captchaData.captcha);
                  updateCaptchaDatas();
                }} disabled={requesting}>删除</button></td>
              </tr>
            </tbody>
          </table>
        </div>)}
      </div>
      <div>
        设置验证码有效期: <input type="date" defaultValue={captchaTime} onChange={e => {
          setCaptchaTime(e.target.value);
        }}></input>
      </div>
      <div>
        <button disabled={requesting} onClick={() => { handleAddCaptchas(); }}>添加10条验证码</button>
        <button disabled={requesting} onClick={async () => {
          await deleteCaptcha(captchaDatas.map(captchaData => captchaData.captcha));
          await updateCaptchaDatas();
        }}>删除全部验证码</button>
      </div>
    </div>
  </div>;
  const levelColor = {
    'info': 'green',
    'error': 'red',
    'debug': 'grey',
  };
  return (
    <div className="app">
      <div>
        {hasLogin ? content : <LoginBox request={request} onClose={async (passwd) => {
          start(passwd);
        }} setInfo={err => setInfo(err)}></LoginBox>}
      </div>
      {info ? <div style={{ color: levelColor[info.level] }}>
        <code>{typeof (info.data) === 'string' ? info.data : JSON.stringify(info.data)}</code>
      </div> : undefined}
    </div>
  );
}

export default App;
