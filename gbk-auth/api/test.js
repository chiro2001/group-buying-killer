'use strict';

const pgOpt = require('pg');
// const { Pool } = require('pg');
const { Pool } = pgOpt;

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

// (async () => {
//   let pgConfig = {
//     user: 'postgres',
//     database: 'gbk',
//     password: '1234',
//     host: '127.0.0.1',
//     port: '5432',
//     poolSize: 5,
//     poolIdleTimeout: 30000,
//     reapIntervalMillis: 10000
//   };
//   let pgPool = new Pool(pgConfig);
//   console.log('pgPool', pgPool);
//   await sleep(1000);
//   pgPool.connect(function (isErr, client, done) {
//     if (isErr) {
//       console.log('connect query:' + isErr.message);
//       return;
//     }
//     client.query('select now();', [], function (isErr, rst) {
//       done();
//       if (isErr) {
//         console.log('query error:' + isErr.message);
//       } else {
//         console.log('query success, data is: ' + rst.rows[0].now);
//       }
//     })
//   });
//   await sleep(1000);
//   let rets = await pgPool.query(`CREATE TABLE IF NOT EXISTS users (
//       ID serial NOT NULL,
//       NAME           TEXT         NOT NULL,
//       EMAIL          CHAR(50)     NOT NULL,
//       SITE          CHAR(50)     NOT NULL
//     );`);
//   console.log('rets', rets);
//   await sleep(10000);
// })();


var conStr = "postgresql://postgres:1234@127.0.0.1:5432/postgres";
var client = new pgOpt.Client(conStr);
client.connect(function (isErr) {
  console.log('now');
  if (isErr) {
    console.log('connect error:' + isErr.message);
    client.end();
    return;
  }
  client.query('select now();', [], function (isErr, rst) {
    if (isErr) {
      console.log('query error:' + isErr.message);
    } else {
      console.log('query success, data is: ' + rst.rows[0].now);
    }
    client.end();
  })
})

console.log('end');
// while (true);

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({
    'done': true
  });
});

var server = app.listen(9001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server running on http://%s:%s", host, port)
})