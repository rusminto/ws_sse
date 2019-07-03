const express = require('express')
var cors = require('cors');
const app = express()
const mqtt = require('mqtt')
//var client = mqtt.connect('mqtt://192.168.100.222')
var client = mqtt.connect('mqtt://localhost')
var topics = "arduino-server"
const __sensor = require('./filterSensor.js')
const sensor = new __sensor()
const __convert = require('./convertData.js')
const convert = new __convert()

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
	// console.log(convertData);
	client.publish(convertData.topic, convertData.msg)
	res.send('OK');
});


app.listen(3000, function () { console.log(`http/1.1 on port 3000!`) });

// app.get('/tes', function (req, res) {
// 	res.send({ data: "aaa" })
// 	console.log(countTes);
// 	countTes++
// })

async function sendMessage(stream, index) {

	client.on('message', function (topic, message) {
		// message is Buffer
		let msg = sensor.filter(message.toString('utf-8'), index)
		
		stream.write("event: message\ndata: " +msg + "\n\n")
	});
}