const io = require('socket.io')

class Mediator {
	constructor (noScreen,appPort, screenPort) {
		this.appPort = appPort
		this.screenPort = screenPort
		this.screens = new Array(noScreen) // map : screenNumber -> {clientSocketID:'2cf',serverSocketID:'e43'}

		for(let i = 0;i<this.screens.length;++i)
			this.screens[i] = {
				clientSocketID:null,
				serverSocketID:null
			}

		this.init()
	}
	/**
	 * Initializes sockets in charge of the sketchpad app
	 */
	init() {
		this.clientSocket = io(this.appPort)
		console.log('[apps]    Listening on localhost at port '+this.appPort)
		this.screensSocket = io(this.screenPort)
		console.log('[screens] Listening on localhost at port '+this.screenPort)
		this.configure()
		console.log('Setup complete.')
	}

	/**
	 * Configures the mediator main behavior
	 * implementation of the protocol
	 */
	configure () {

		let context = this
		let clientSocketIDs = this.screens.map(s => s.clientSocketID)
		let serverSocketIDs = this.screens.map(s => s.serverSocketID)

		// Setting connection handle
		this.clientSocket.on('connection', function (socket) {

			socket.emit('state',context.getState())

			socket.on('subscribe',  (data) => {

				const screen = context.screens[data.screenNumber]

				console.log('Request received for screen '+data.screenNumber)

				// Testing screen availability
				if (screen.clientSocketID !== null) {
					socket.emit('err', 'Screen already occupied.')
					socket.emit('ack',false)
					return
				}

				// Assigning connection id and screen
				context.screens[data.screenNumber].clientSocketID = socket.id

				socket.emit('ack',true)
			})

			socket.on('kick', (data) =>	context.screens[data.screenNumber].clientSocketID = null)

			socket.on('addItem', (data) => {

			  console.log('Item adding requested...')

				// Checking screen sync with client
				if (!clientSocketIDs.includes(socket.id)) {
					socket.emit('err', 'No screen associated with client anymore.')
					return
				}

				// Checking that we have a manager to process our queries
				const screens = context.screens[clientSocketIDs.indexOf(socket.id)].serverSocketID
				if (screens === undefined) {
					socket.emit('err', 'No manager for subscribed screen.')
					return
				}

				// Transmitting data to appropriate manager
				for(const screen of screens)
					context.screensSocket.to(screen).emit('addItem',data)

			})

			// Removing the association between the disconnect client and the screen
			socket.on('disconnect', () => context.screens[context.screens.map(s => s.clientSocketID).indexOf(socket.id)].clientSocketID = null)

		})

		this.screensSocket.on('connection', function (socket) {
			socket.on('subscribe', (data) => {
				console.log('Screen manager subscribe with screens : '+data.screens)

				// Associating all screens with joining manager
				for (const screenNo of data.screens) {

					if(serverSocketIDs[screenNo] === null)
						context.screens[screenNo].serverSocketID = [socket.id]
					else
						context.screens[screenNo].serverSocketID.push(socket.id)
				}

				socket.emit('ack',true)
			})

			socket.on('disconnect', () => {
				// Removing all bindings related to the manager that just disconnected
				for (let i = 0; i < context.screens.length; i++) {
					if (context.screens[i] !== undefined && serverSocketIDs.includes(socket.id)) {
						context.screens[serverSocketIDs.indexOf(socket.id)] = null
					}
				}
			})
		})
	}

	/*
	 * Getter for the mediator underlying state
	 */
	getState(){
		return this.screens.map((s) => s.clientSocketID===null)
	}
}

module.exports = Mediator
