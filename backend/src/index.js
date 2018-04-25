const network = require('./config.json');
const Mediator = require('./mediator');
/**
 * Initializes all websockets
 */
const mediator = new Mediator(network.screenNumber, network.appsPort, network.screenPort);

