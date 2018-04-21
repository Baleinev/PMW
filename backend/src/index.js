const network = require('./config.json')
const Mediator = require('./websocket/mediator');
/**
 * Initializes all websockets
 */
const mediator = new Mediator(8, network.appsPort, network.screenPort);

