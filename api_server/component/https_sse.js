const express = require('express')
var cors = require('cors');
const app = express()
const mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.100.6')
var topics = "arduino-server"
const __sensor = require('./filterSensor.js')
const sensor = new __sensor()
const __convert = require('./convertData.js')
const convert = new __convert()
var https = require('https')
const fs = require('fs');


app.use(cors())
app.use(express.static('public'))
app.use(express.json());

client.subscribe(topics);

app.get('/:index', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
	});
	res.write('\n');
	sendMessage(res, req.params.index)
});

app.post('/', (req, res) => {
	let convertData = convert.convert(req.body)
	client.publish(convertData.topic, convertData.msg)
	res.send('OK');
});

https.createServer({
	key: fs.readFileSync('./cert/server.key'),
	cert: fs.readFileSync('./cert/server.crt')
  }, app)
  .listen(3002, function () {
	console.log(`https 1.1 on port 3002!`)
  })

async function sendMessage(stream, index) {

	client.on('message', function (topic, message) {
		// message is Buffer
		
		let msg = sensor.filter(message.toString('utf-8'), index)
		stream.write("event: message\ndata: " +msg + "\n\n")
	});
}