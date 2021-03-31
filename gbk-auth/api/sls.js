'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uc = require('./controller/user');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const g_admin_passwd = process.env.ADMIN_PASSWD ? process.env.ADMIN_PASSWD : '1352040930chiro#*';

const makeResponse = (code, message, data) => {
  return {
    code: code,
    message: message,
    data: data
  };
}

const getCatcher = function (res) {
  return e => {
    console.warn(e);
    res.json(makeResponse(e.code, e.toString()));
  };
}

app.get('/', (req, res) => {
  res.json(makeResponse(0, `Server time: ${new Date().toString()}`));
});

app.post('/user/regist', async (req, res) => {
  const user = req.body;
  console.log('user', user);
  // uc.createUser(user).then(() => { res.json(makeResponse(0, 'OK')); }).catch(getCatcher(res));
  try {
    await uc.createUser(user);
  } catch (e) {
    getCatcher(res)(e);
    return;
  }
  res.json(makeResponse(0, 'OK'));
});

app.post('/user/login', async (req, res) => {
  const { phone, password } = req.body;
  try {
    const result = await uc.checkUserByPassword(phone, password);
    if (!result) {
      res.json(makeResponse(1010, '电话或密码错误.'));
      return;
    }
    const auth = await uc.getUserAuth(phone);
    if (!auth) {
      res.json(makeResponse(0, '用户未认证.', { auth: null }));
      return;
    }
    res.json(makeResponse(0, 'OK', { auth: auth }));
  } catch (e) {
    console.warn(e);
    res.json(makeResponse(e.code, e.toString()));
    return;
  }
});

app.post('/auth', async (req, res) => {
  const { auth_input } = req.body;
  try {
    const res = await uc.checkUserByAuth(auth_input);
    if (!res) {
      res.json(makeResponse(1010, '认证错误.'));
      return;
    }
  } catch (e) {
    console.warn(e);
    res.json(makeResponse(e.code, e.toString()));
    return;
  }
  res.json(makeResponse(0, 'OK'));
});

app.post('/user/delete', async (req, res) => {
  const { phone, password } = req.body;
  try {
    const result = await uc.checkUserByPassword(phone, password);
    if (!result) {
      res.json(makeResponse(1010, '电话或密码错误.'));
      return;
    }
    await uc.deleteUserByPhone(phone);
  } catch (e) {
    console.warn(e);
    res.json(makeResponse(e.code, e.toString()));
    return;
  }
  res.json(makeResponse(0, 'OK'));
});

app.post('/admin/users', async (req, res) => {
  const { admin_passwd } = req.body;
  if (admin_passwd === g_admin_passwd) {
    res.json(makeResponse(0, 'OK', {
      users: await uc.getUserList()
    }));
    return;
  }
  res.json(makeResponse(403, 'Forbidden'));
});


app.post('/admin/auth_user', async (req, res) => {
  const { admin_passwd, phone } = req.body;
  if (admin_passwd !== g_admin_passwd) {
    res.json(makeResponse(403, 'Forbidden'));
    return;
  }
  try {
    const auth = await uc.authUser(phone);
    res.json(makeResponse(0, 'OK', { auth: auth }));
    return;
  } catch (e) {
    console.warn('Caught error:', e);
    res.json(makeResponse(e.code, e.toString()));
    return;
  }
});


// 捕获404并定向到错误处理
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// 错误处理
app.use(function (err, req, res, next) {
  // 设置响应状态
  res.status(err.status || 500);
  // // 渲染错误处理页
  // res.render('error', {
  //   message: err.message,
  //   error: {},
  //   layout: false
  // });
  res.json(makeResponse(err.status || 500, err.message));
});

module.exports = app;
