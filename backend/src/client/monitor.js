const io = require('socket.io-client')
const {host,clientPort,screenPort} = require('../config')

const wsClient = io('ws://'+host+':'+clientPort)
const wsScreen = io('ws://'+host+':'+screenPort)

wsClient.on('err',(data) => {console.log(data)})
wsScreen.on('err',(data) => {console.log(data)})


wsClient.on('addItem',(data) => console.log('[screen1] Item successfully added : '+data.test))
wsScreen.on('addItem',(data) => console.log('[screen2] Item successfully added : '+data.test))

wsScreen.emit('subscribe', {screens:[1,2,5]})

setTimeout(()=>wsClient.emit('kick',{screenNumber:2}),5000)


