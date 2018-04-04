// note, io(<port>) will create a http server for you

var app = require('http').createServer((req, res) => {
})
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(2000);

io.on('connection', function (socket) {

  socket.on('addItem', function (data) {
	socket.broadcast.emit('addItem', data);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
