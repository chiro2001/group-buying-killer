const app = require('./sls');

// console.log(app);

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server running on http://%s:%s", host, port)
})

// 不知道为啥会超时
// server.setTimeout(100);
// server.keepAliveTimeout = 100;
// server.on('timeout', function (a, b, c) {
//   console.log('超时了');
//   console.log(b, c);
// })