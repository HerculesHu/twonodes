var express = require('express');
var app = express();
var sc=require('socket.io-client');

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ioc = require('socket.io-client');
var bodyParser = require('body-parser');
var users = [];


app.use('/', express.static(__dirname+'/'));

app.all('*',function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
     if (req.method == 'OPTIONS') {
         res.send(200);
     }
     else {
         next();
     }
  });
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/process_post', urlencodedParser, function (req, res) {

  // 输出 JSON 格式
  response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

server.listen(40019);



io.sockets.on('connection',(socket)=>{
  // 失去连接
  socket.on('disconnect',function(){
    if(users.indexOf(socket.username)>-1){
       users.splice(users.indexOf(socket.username),1);
       console.log(socket.username+'===>disconnected');
    }

      socket.broadcast.emit('users',{number:users.length});
  });

  socket.on('message',function(data){
    let newData = {text: data.text, user: socket.username}
    socket.emit('receive_message',newData);
    socket.broadcast.emit('receive_message',newData);
  });


  socket.on('login',function(data){
    if(users.indexOf(data.username)>-1){

    }else{
      socket.username = data.username;
      users.push(data.username);
      // 统计连接数
      socket.emit('users',{number:users.length});  // 发送给自己
      socket.broadcast.emit('users',{number:users.length}); // 发送给其他人
    }

  });

});


var pubmag={}
pubmag.hzy=777;
pubmag.herculeshu=true;

var socket_client = ioc.connect('http://127.0.0.1:40018');
socket_client.emit('login', { username: 'user'+ new Date().getTime()});
socket_client.emit('conn', pubmag);

socket_client.on('STR',function(data){
  console.log(data);

});

console.log('服务器运行于：localhost:40019');
