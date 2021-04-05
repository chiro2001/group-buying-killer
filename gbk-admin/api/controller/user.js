'use strict';

const { Pool } = require('pg');
const { checkPassword } = require("../utils/utils");
const { createAuth } = require('../utils/encrypt');

function ApiError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
}

let pgPool = null;
const tableName = 'users';
const tableStruct = `
CREATE TABLE IF NOT EXISTS ${tableName} (
  id             serial       NOT NULL,
  name           VARCHAR(128) NOT NULL,
  password       VARCHAR(128) NOT NULL,
  email          VARCHAR(256)         ,
  phone          VARCHAR(50)  NOT NULL,
  address        VARCHAR(256)         ,
  auth           VARCHAR(128)         ,
  authUntil      TIMESTAMP
);`;

const captchaName = 'captcha';
const captchaStruct = `
CREATE TABLE IF NOT EXISTS ${captchaName} (
  id             serial       NOT NULL,
  captcha        VARCHAR(128) NOT NULL,
  authUntil      TIMESTAMP
);
`;

module.exports = {
  async getPool() {
    if (!pgPool) {
      pgPool = new Pool({
        connectionString: process.env.PG_CONNECT_STRING ? process.env.PG_CONNECT_STRING : 'tcp://postgres:1234@localhost/gbk',
        // connectionString: 'postgresql://tencentdb_j6dgrgzs:765gkw9UqvoX~%2C%7D@10.0.0.15:5432/tencentdb_j6dgrgzs',
        // connectionString: 'tcp://postgres:1234@localhost/gbk'
      });
      // init table
      await pgPool.query(tableStruct);
      await pgPool.query(captchaStruct);
      return pgPool;
    } else {
      return pgPool;
    }
  },
  async clearData() {
    const pool = await this.getPool();
    const client = await pool.connect();
    let { rows } = await client.query({
      text: `DROP TABLE IF EXISTS ${tableName}`,
    });
    rows = (await client.query({
      text: `DROP TABLE IF EXISTS ${captchaName}`,
    })).rows;
    await client.end();
    pgPool = null;
    return rows;
  },
  async getUserList() {
    const pool = await this.getPool();
    const client = await pool.connect();
    const { rows } = await client.query({
      text: `SELECT * from ${tableName}`,
    });
    await client.end();
    return rows;
  },
  async createUser(user) {
    const pool = await this.getPool();
    const { name, email, password, phone, address } = user;
    if (!phone) {
      throw new ApiError(400, `Phone ${phone} is empty.`)
    }
    const existUser = await this.getUserByPhone(phone);
    if (existUser) {
      throw new ApiError(400, `Phone ${phone} exist.`);
    }

    const check = checkPassword(password);
    if (!check.state) throw new ApiError(403, check.message);
    let password_sha1 = createAuth(password, false);
    const client = await pool.connect();
    const { rowCount } = await client.query({
      text: `INSERT INTO ${tableName}(name, email, password, phone, address) VALUES($1, $2, $3, $4, $5)`,
      values: [name, email, password_sha1, phone, address],
    });
    await client.end();
    return rowCount === 1;
  },
  async getUserByPhone(phone) {
    try {
      const pool = await this.getPool();
      const client = await pool.connect();
      const { rows } = await client.query({
        text: `SELECT * FROM ${tableName} WHERE phone = $1`,
        values: [phone],
      });
      await client.end();
      if (rows.length > 0) {
        return rows[0];
      }
      return false;
    } catch (e) {
      throw new ApiError(500, e);
    }
  },
  async getUserByAuth(auth) {
    try {
      const pool = await this.getPool();
      const client = await pool.connect();
      const { rows } = await client.query({
        text: `SELECT * FROM ${tableName} WHERE auth = $1`,
        values: [auth],
      });
      await client.end();
      if (rows.length > 0) {
        return rows[0];
      }
      return false;
    } catch (e) {
      throw new ApiError(500, e);
    }
  },
  async deleteUserByPhone(phone) {
    const pool = await this.getPool();
    const client = await pool.connect();
    const { rows } = await client.query({
      text: `DELETE FROM ${tableName} WHERE phone = $1`,
      values: [phone],
    });
    await client.end();
    return rows;
  },
  async authUser(phone) {
    const pool = await this.getPool();
    const client = await pool.connect();
    const { rows } = await client.query({
      text: `SELECT * FROM ${tableName} WHERE phone = $1`,
      values: [phone],
    });
    await client.end();
    if (rows.length !== 1)
      return false;
    const user = rows[0];
    if (user.auth)
      throw new ApiError(400, `User ${phone} has been authed.`);
    try {
      const auth = createAuth(user.phone);
      const client2 = await pool.connect();
      const { rowCount } = await client2.query({
        text: `UPDATE ${tableName} SET auth = $1 WHERE phone = $2`,
        values: [auth, phone],
      });
      await client2.end();
      return auth;
    } catch (e) {
      throw new ApiError(500, e.message);
    }
  },
  async getUserAuth(phone) {
    const existUser = await this.getUserByPhone(phone);
    if (!existUser) return false;
    console.log('existUser', existUser);
    return existUser.auth;
  },
  async checkUserByAuth(auth) {
    const user = await this.getUserByAuth(auth);
    if (!user) return false;
    return user;
  },
  async checkUserByPassword(phone, password) {
    const user = await this.getUserByPhone(phone);
    if (!user) return false;
    let password_sha1 = createAuth(password, false);
    if (password_sha1 === user.password) return user;
    return false;
  },
  async setAuthTime(phone, time) {
    if (!time) time = new Date();
    if ((time) instanceof Date) time = time.toISOString();
    const user = await this.getUserByPhone(phone);
    if (!user) throw new ApiError(400, `User ${phone} not found.`);
    const pool = await this.getPool();
    const client = await pool.connect();
    const { rows } = await client.query({
      text: `UPDATE ${tableName} SET authUntil = $1 WHERE phone = $2`,
      values: [time, phone],
    });
    await client.end();
    return true;
  },
  // 没有 authUntil 标记的是永久可用的
  async checkAvaliable(phone, time) {
    let user = await this.getUserByPhone(phone);
    if (!user || !user.auth) return false;
    if (!user.authUntil) return true;
    if (!time) time = new Date().getTime();
    try {
      return new Date(user.authUntil).getTime() < time;
    } catch (e) {
      throw new ApiError(500, e.message);
    }
  },
  async addCaptchas(captchas) {
    if (!(captchas instanceof Array)) captchas = [captchas,];
    const pool = await this.getPool();
    const client = await pool.connect();
    for (let captchaData of captchas) {
      console.log('inserting', captchaData)
      if (!captchaData.captcha) continue;
      // 可以留空
      if (!captchaData.authUntil) captchaData.authUntil = new Date('2090-01-01').toISOString();
      const { rows } = await client.query({
        text: `INSERT INTO ${captchaName}(captcha, authUntil) VALUES ($1, $2)`,
        values: [captchaData.captcha, captchaData.authUntil],
      });
    }
    await client.end();
  },
  async setCaptchaTime(captcha, time) {
    if (!time) time = new Date();
    if ((time) instanceof Date) time = time.toISOString();
    let captchaData = await this.findCaptcha(captcha);
    if (!captchaData) return false;
    captchaData.authUntil = time;
    const pool = await this.getPool();
    const client = await pool.connect();
    const { rows } = await client.query({
      text: `UPDATE ${captchaName} SET time = $1 WHERE captcha = $2`,
      values: [captchaData.authUntil, captchaData.captcha],
    });
    await client.end();
  },
  async deleteCaptchas(captchas) {
    if (!(captchas instanceof Array)) captchas = [captchas,];
    for (let captcha of captchas) {
      if (!captcha) continue;
      if (captcha.captcha) captcha = captcha.captcha;
      let captchaData = await this.findCaptcha(captcha);
      if (!captchaData) throw new ApiError(400, `Captcha ${captcha} not found.`);
      const pool = await this.getPool();
      const client = await pool.connect();
      const { rows } = await client.query({
        text: `DELETE FROM ${captchaName} WHERE captcha = $1`,
        values: [captcha, ],
      });
      await client.end();
    }
  },
  async findCaptcha(captcha) {
    const pool = await this.getPool();
    const client = await pool.connect();
    let rows;
    if (!captcha) {
      const { rows } = await client.query({
        text: `SELECT * FROM ${captchaName}`
      });
      await client.end();
      return rows;
    } else {
      const { rows } = await client.query({
        text: `SELECT * FROM ${captchaName} WHERE captcha = $1`,
        values: [captcha,],
      });
      await client.end();
      if (rows.length !== 1) return false;
      return rows[0];
    }
  },
  async applyCaptcha(phone, captcha) {
    const captchaData = this.findCaptcha(captcha);
    if (!captchaData) return false;
    await this.setAuthTime(phone, captchaData.authUntil);
    return true;
  }
};
