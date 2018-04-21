const Mediator = require('./websocket/mediator');
const network = CONFIG.network;

/**
 * Initializes all websockets
 */
const mediator = new Mediator(8, network.appsPort, network.appsPort)

