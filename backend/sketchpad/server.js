// note, io(<port>) will create a http server for you
var io = require('socket.io')(2000);

io.on('connection', function (socket) {

	console.log("connection")
  socket.on('addItem', function (data) {
	console.log("Received item")
	socket.broadcast.emit('addItem', data);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
