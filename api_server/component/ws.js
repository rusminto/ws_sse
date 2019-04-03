const express = require('express')
var cors = require('cors');
const app = express()
const mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost')
var topics = "arduino-server"

app.use(cors())
app.use(express.static('public'))

client.subscribe(topics);

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
	console.log(request.headers);
	response.writeHead(404);
	response.end();
});

server.listen(1337, function () { console.log(`websocket on port 1337!`) });

var wsServer = new WebSocketServer({
	httpServer: server
});

wsServer.on('request', function (request) {

	var connection = request.accept()

	sendMessage(connection)

	console.log((new Date()) + ' Connection accepted.');
	connection.on('message', function (message) {
		console.log("pesan : " + message.utf8Data);
		client.publish('server-arduino', message.utf8Data)
	});
	connection.on('close', function (reasonCode, description) {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});
});

function sendMessage(stream) {
	client.on('message', function (topic, message) {
		// message is Buffer
		stream.sendUTF(message.toString('utf-8'));
	});
}