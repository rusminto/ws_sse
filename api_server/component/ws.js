const express = require('express')
var cors = require('cors');
const app = express()
const mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost')
var topics = "arduino-server"
const __sensor = require('./filterSensor.js')
const sensor = new __sensor()

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
	
	sendMessage(connection, request.resourceURL.path.split('/')[1])

	console.log((new Date()) + ' Connection accepted.');
	connection.on('message', function (message) {
		console.log("pesan : " + message.utf8Data);
		client.publish('server-arduino', message.utf8Data)
	});
	connection.on('close', function (reasonCode, description) {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});
});

function sendMessage(stream, index) {
	client.on('message', function (topic, message) {
		// message is Buffer
		let msg = sensor.filter(message.toString('utf-8'), index)
		
		stream.sendUTF(msg);
	});
}