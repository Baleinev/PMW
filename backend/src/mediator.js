const io = require('socket.io');
/**
 * Provides with an interface to communicate back and forth
 * between the screens and the apps.
 * 4 entites are to be distinguished ; the apps, the mediator, the screen and the monitor.
 * An app is defined as the endpoint provided to the users.
 * We then make a big difference between a 'conceptual screen' and
 * a 'physical screen'. The former is the entity behind the latter and
 * thus managing it.
 * Finally, the monitor is a potential man-in-the-midde actor, providing
 * with administrations actions (overseeing traffic, kicking users, ...)
 *
 * PROTOCOL APPS -> MEDIATOR :
 *  - 'state' , {} : query the state of the screens (availability)
 *  - 'reserve', {screenNumber:int} : Asks for a reservation for the screen specified in the payload
 *  - 'terminate', {} : Terminate connection and frees association with hosts
 *  - 'addShape', {item:paint object,screenNumber:int} : Add a shape to be drawn on the screen
 *
 * PROTOCOL MONITOR -> APPS :
 *  - 'kick' , {screenNumber:int} : Kicks a user on the screen specified by the payload
 *
 * PROTOCOL SCREEN -> MEDIATOR :
 *  - 'susbcribe', {screens:[]} : Informs the mediator that this 'screen' is managing
 *                                the specified physical screens.
 */
class Mediator {
  constructor(noScreen, appPort, screenPort) {
    this.appPort = appPort;
    this.screenPort = screenPort;
    this.screens = new Array(noScreen);
    this.ads = []

    for (let i = 0; i < this.screens.length; ++i) {
      this.screens[i] = {
        clientSocketID: null,
        serverSocketID: [],
      };
    }

    this.init();
  }
  /**
   * Initializes sockets in charge of the sketchpad app
   */
  init() {
    this.clientSocket = io(this.appPort);
    console.log(`[apps]    Listening on localhost at port ${this.appPort}`);
    this.screensSocket = io(this.screenPort);
    console.log(`[screens] Listening on localhost at port ${this.screenPort}`);
    this.configure();

    const ads = require('./ads');
    this.setupAdFactories(ads);
    setInterval(()=>{this.consumeAd();}, 10000)
    console.log('Setup complete.');
  }

  /**
   * Configures the mediator main behavior
   * implementation of the protocol
   */
  configure() {

    const context = this;

    // Setting connection handle
    this.clientSocket.on('connection', (socket) => {
      socket.on('state', (res) => {
        res(this.getState());
      });

      socket.on('reserve', (data, res) => {
        // Sanity check
        if ((!data.screenNumber && data.screenNumber !== 0) ||
            data.screenNumber < 0 ||
            data.screenNumber > this.screens.length) {
          res(false);
          return;
        }

        console.log(`Request received for screen ${data.screenNumber}`);
        const screen = context.screens[data.screenNumber];

        // Testing screen availability
        if (screen.clientSocketID !== null) {
          res(false);
        } else {
          // Assigning connection id and screen
          context.screens[data.screenNumber].clientSocketID = socket.id;
          res(true);
        }
      });

      socket.on('terminate', () => {
          const i = this.screens.findIndex(screen => screen.clientSocketID === socket.id);

          if(i !== -1)
            this.screens[i].clientSocketID = null

      });

      socket.on('kick', (data) => { context.screens[data.screenNumber].clientSocketID = null; });

      socket.on('addShape', (item, { screenNumber }, res) => {
        console.log('Item adding requested...');

        // Checking screen sync with client
        if (this.screens[screenNumber].clientSocketID !== socket.id) {
          res(false);
          return;
        }

        // Checking that we have a manager to process our queries
        const screens = this.screens[screenNumber].serverSocketID;
        if (screens === undefined) {
          res('No manager for subscribed screen.');
          return;
        }

        // Transmitting data to appropriate manager
        screens.forEach((screen) => {
          context.screensSocket.to(screen).emit('addShape', item, screenNumber);
        });
      });

      // Removing the association between the disconnect client and the screen
      socket.on('disconnect', () => {
          const i = this.screens.findIndex(screen => screen.clientSocketID === socket.id);

          if(i !== -1)
              this.screens[i].clientSocketID = null
      });
    });

    this.screensSocket.on('connection', (socket) => {
      socket.on('subscribe', (data, res) => {
        console.log(`Screen manager subscribe with screens : ${data.screens}`);

        // Associating all screens with joining manager
        data.screens.forEach((i) => {
          this.screens[i].serverSocketID.push(socket.id);
        });

        res(true);
      });

      socket.on('disconnect', () => {
        const serverSocketIDs = this.screens.map(s => s.serverSocketID);

          // Removing all bindings related to the manager that just disconnected
        for (let i = 0; i < context.screens.length; i++) {
          if (context.screens[i] !== undefined && serverSocketIDs.includes(socket.id)) {
            context.screens[serverSocketIDs.indexOf(socket.id)] = null;
          }
        }
      });
    });

  }

  /**
   * Setup the automatic addition of ad to the server stack
   * @param ads The whole ads collection
   */
  setupAdFactories(ads){
      for(const ad of ads)
        setInterval(()=>{this.ads.push(ad)}, ad.interval*1000)
  }

  /**
   * Consume one ad to be display to a free screen
   */
  consumeAd(){
      if(this.ads === [])
          return

      const availableScreens = this.getStateIndex()
      const adsToDisplay = Math.min(availableScreens.length,this.ads.length)

      console.log("Order to display "+adsToDisplay+" ads")

      for(let i = 0;i<adsToDisplay;i++) {
          const sockets = this.screens[availableScreens[i]].serverSocketID

          for(const socket of sockets)
              this.screensSocket.to(socket).emit('ad',this.ads.pop())
      }
  }

  /**
   * Getter for the mediator underlying state
   * @returns {boolean[]}
   */
  getState() {
    return this.screens.map(s => s.clientSocketID === null);
  }

  /**
   * Getter for the mediator underlying state
   * under the form of an array of index of available
   * screens.
   */
  getStateIndex(){
      const screens = this.getState()
      const availableScreens = []
      for(const i in screens)
          if(screens[i])
              availableScreens.push(i)
      return availableScreens
  }
}

module.exports = Mediator;
