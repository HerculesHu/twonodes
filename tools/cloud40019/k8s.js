var express = require('express');
var app = express();
var sc=require('socket.io-client');

var server = require('http').createServer(app);

app.use('/', express.static(__dirname+'/'));
// app.all('*',function (req, res, next) {
//      res.header('Access-Control-Allow-Origin', '*');
//      res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , Node-RED-Deployment-Type');
//      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
//      if (req.method == 'OPTIONS') {
//          res.send(200);
//      }
//      else {
//          next();
//      }
//   });
app.all('/flows', function (req, res) {

  console.log(req.body)

})


server.listen(40018);







console.log('服务器运行于：localhost:40018');
