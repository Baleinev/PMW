const io = require('socket.io');
const {appPort,screenPort} = require('./config');
const config = require('./config');

const appSocket = io(appPort);
const screenSocket = io(screenPort);

appSocket.on('connection', function (socket) {

    socket.on('gifcorner',(url) => {
        screenSocket.emit('gifcorner',{
            url:url,
            screen: Math.floor(Math.random() * Math.floor(config.screens))
        })
    })
});

