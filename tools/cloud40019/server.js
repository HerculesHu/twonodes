var express = require('express');
var app = express();
var sc=require('socket.io-client');

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var users = [];
var STRmsg={};
STRmsg.back=true;
STRmsg.num=142857;



// var urlencodedParser = bodyParser.urlencoded({ extended: true })


app.use('/', express.static(__dirname+'/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
server.listen(40018);

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



  socket.on('conn',function(data){
      console.log(data);
      socket.emit('STR', STRmsg);

  });

  app.post('/flows', function (req, res) {

    console.log(req.body)
    // console.log(response);
    socket.broadcast.emit('STR', req.body);
    res.end(JSON.stringify("666"));
  })

});


console.log('服务器运行于：localhost:40018');
