const mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost')
var topics = "smarthome"

var WebSocketClient = require('websocket').client;

client.subscribe(topics);

var clientWs = new WebSocketClient();

clientWs.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

 
clientWs.on('connect', function(connection) {
    // console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    // connection.on('message', function(message) {
    //     if (message.type === 'utf8') {
    //         console.log("Received: '" + message.utf8Data + "'");
    //     }
    // });
    
    if (connection.connected) {
		client.on('message', function (topic, message) {
			// message is Buffer
			// messageBroker.setNewMsg(message.toString('utf8'))
			connection.sendUTF(message.toString('utf-8'));
		});
	}
});

clientWs.connect('ws://localhost:1337/');