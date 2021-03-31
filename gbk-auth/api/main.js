const app = require('./sls');

// console.log(app);

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server running on http://%s:%s", host, port)
})