// note, io(<port>) will create a http server for you

const network =  require('../src/config.json');

var io = require('socket.io')(network.socketPort);

io.on('connection', function (socket) {

  socket.on('addItem', function (data) {
	socket.broadcast.emit('addItem', data);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
