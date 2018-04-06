let SCREEN_WIDTH = 800*5;
let SCREEN_HEIGHT = 600;
let AUTOSEND = 30000;
var order = initOrder()

function initOrder(){
    var temp = []

    for(var i=0;i<45;i++)
        temp[i]=i

    return shuffle(temp)
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Example of communication with the Lausanne Lumières server

// When the connection to the server is first opened, you need to say
// hello, and tell the server who you are.
// 
// At that point, the server will also say hello. The server's hello will
// send you any data you might have sent it using updateState (see below)
function onOpen(connection) {
  console.log("Connection with server opened");

  connection.sendMessage({
    type: 'hello',
    data: {
      game: 'gifcorner'
    }
  });
}

// When you receive something (including pings), this function will be called
// with the parsed JSON message all ready for you in parsedMessage.
function onMessage(connection, parsedMessage) {
  switch (parsedMessage.type) {
    case 'hello':
      // When you say hello, the server says hello and sends you the state
      console.log("Server said hello.");
      console.log(parsedMessage.data.state);
      break;
    case 'state':
      // You will get this if you make a requestState command
      console.log("Got state");
      console.log(parsedMessage.data.state);
      break;
    case 'gifcorner.addGIF':

        if(order.length===0)
            order = initOrder();

        let index = order.pop();

        $("#subscreen"+index).css("background-image","url("+parsedMessage.data.url+")");
        break;

      default:
      // Pings and other garbage you don't care about
      console.log("Got a message from the server");
      console.log(parsedMessage);
  }
}

// THIS IS WHERE THE MAGIC HAPPENS
// Create a persistent connection to the mainframe
// 
// Specify it an onOpen callback to send it "hello"
// Specify it an optional onClose to clean up your shit
// Specify it an onMessage callback to actually receive stuff!
var connection = new WebsocketConnection(
  'jebediah.pimp-my-wall.ch',
  8000,
  {
    open: onOpen,
    close: function () {},
    message: onMessage
  }, {
    autoConnect: true,
    autoReconnect: true
  }
);

for(var i=0;i<45;i++){
    let top = Math.floor(i/15)*(SCREEN_HEIGHT/3);
    let left = (i%15)*(SCREEN_WIDTH/15);
    $("body").append("<div id='subscreen"+i+"' class='subscreen' style='top:"+top+"px;left:"+left+"px;'></div>")
}
let urls = [];
$.getJSON("../res/url.json",function(data){

     $.each(data.urls,function () {
         urls.push(this)
     });

     setInterval(function(){
        if(order.length===0)
            order = initOrder();

        let index = order.pop();
        $("#subscreen"+index).css("background-image","url("+urls[Math.floor(Math.random()*urls.length)]+")");

    },AUTOSEND);
});

