var express = require('express');
var app = express();
var sc=require('socket.io-client');

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');




app.use('/', express.static(__dirname+'/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
server.listen(40018);


//支持跨域访问的http头部包装
app.all('*',function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , Node-RED-Deployment-Type');
     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
     if (req.method == 'OPTIONS') {
         res.send(200);
     }
     else {
         next();
     }
  });

io.sockets.on('connection',(socket)=>{
  // 失去连接
  socket.on('disconnect',function(){

  });


  socket.on('checkrec',function(data){
    console.log(data);
  });

  app.post('/flows', function (req, res) {
    // console.log(req.body)
    // console.log(response);
    socket.broadcast.emit('STR', req.body);
    res.end(JSON.stringify("666"));
  })

});


console.log('Cloud开始运行：localhost:40018');
