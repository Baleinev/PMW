// note, io(<port>) will create a http server for you

var io = require('socket.io')(2000);

io.on('connection', function (socket) {

  socket.on('addItem', function (data) {
	socket.broadcast.emit('addItem', data);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
