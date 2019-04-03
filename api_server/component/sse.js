const express = require('express')
var cors = require('cors');
const app = express()
const mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost')
var topics = "arduino-server"

app.use(cors())
app.use(express.static('public'))
app.use(express.json());

client.subscribe(topics);

app.get('/', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
	});
	res.write('\n');
	sendMessage(res)
});

app.post('/', (req, res) => {
	client.publish('server-arduino', req.body.data)
	res.send('OK');
});


app.listen(3000, function () { console.log(`http/1.1 on port 3000!`) });

// app.get('/tes', function (req, res) {
// 	res.send({ data: "aaa" })
// 	console.log(countTes);
// 	countTes++
// })

function sendMessage(stream) {

	client.on('message', function (topic, message) {
		// message is Buffer
		stream.write("event: message\ndata: " + message.toString('utf-8') + "\n\n")
	});
}