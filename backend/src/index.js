const Mediator = require('./websocket/mediator')

/**
 * Initializes all websockets
 */
const mediator = new Mediator(8, 9001, 9002)

