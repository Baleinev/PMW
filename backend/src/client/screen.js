const io = require('socket.io-client')
const io2 = require('socket.io-client')

const wsClient = io('http://localhost:9002')
const wsClient2 = io2('http://localhost:9002')

wsClient.on('err',(data) => {console.log(data)})
wsClient2.on('err',(data) => {console.log(data)})

wsClient.emit('subscribe', {screens:[1,2,5]})
wsClient2.emit('subscribe', {screens:[0,3,4]})

