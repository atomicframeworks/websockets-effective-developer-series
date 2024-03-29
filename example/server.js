var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  
  // When the server receives a chat message emit it back to all sockets
  socket.on('chat message from client', function (msg) {
    console.log('server got a message');
    io.emit('chat message from server', msg);
  });
  
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});