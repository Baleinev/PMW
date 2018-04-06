const wsClients = []

setup = (wsClients,i) =>{
	wsClients[i] = require('socket.io-client')('http://localhost:9001')
	wsClients[i].on('err', (data) => console.log(data))
	wsClients[i].on('state',(data) => console.log('['+wsClients[0].id+']'+' State : ',data))
	wsClients[i].on('ack',(data) => console.log('Subscription : '+(data===true?'Success':'Failed')))

	wsClients[i].emit('subscribe', {screenNumber:i})
}

setTimeout(()=>setup(wsClients,0),1000)
setTimeout(()=>setup(wsClients,1),3000)
setTimeout(()=>setup(wsClients,2),5000)








