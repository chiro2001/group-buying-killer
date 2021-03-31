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
const tableStruct = `CREATE TABLE IF NOT EXISTS users (
  id             serial       NOT NULL,
  name           VARCHAR(128) NOT NULL,
  password       VARCHAR(128) NOT NULL,
  email          VARCHAR(256)         ,
  phone          VARCHAR(50)  NOT NULL,
  address        VARCHAR(256)         ,
  auth           VARCHAR(128)
);`;

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
      return pgPool;
    } else {
      return pgPool;
    }
  },
  async getUserList() {
    const pool = await this.getPool();
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'select * from users',
    });
    await client.end();
    return rows;
  },
  async createUser(user) {
    const pool = await this.getPool();
    const { name, email, password, phone, address } = user;
    if (!phone) {
      throw new ApiError(1002, `Phone ${phone} is empty.`)
    }
    const existUser = await this.getUserByPhone(phone);
    if (existUser) {
      throw new ApiError(1000, `Phone ${phone} exist.`);
    }

    const check = checkPassword(password);
    if (!check.state) throw new ApiError(1005, check.message);
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
      throw new ApiError(1001, e);
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
      throw new ApiError(1001, e);
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
      throw new ApiError(1004, `User ${phone} has been authed.`);
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
      throw new ApiError(1001, e.message);
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
  }
};
