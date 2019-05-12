const http2 = require('http2');
const fs = require('fs');
const mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost')
var topics = "arduino-server"
const __sensor = require('./filterSensor.js')
const sensor = new __sensor()

client.subscribe(topics);


http2.createSecureServer({
	key: fs.readFileSync('./cert/server.key'),
	cert: fs.readFileSync('./cert/server.crt')
},
	(req, res) => {
		
		if (req.headers[':method'] == 'POST') {
			let body = '';
			req.setEncoding('utf8');
			req.on('data', (chunk) => {
				body += chunk
			})
			req.on('end', () => {
				try{
					console.log(body);
					client.publish('server-arduino', body)
					res.end()
				}catch(err){
					res.statusCode = 400;
					res.end(err)
				}
			})
			
			client.publish('server-arduino', 'sse_http2')
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.write('OK')
		} else if (req.headers[':method'] == 'GET') {

			new Promise((resolve) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/event-stream');
				res.setHeader('Cache-Control', 'no-cache')
				res.setHeader('Access-Control-Allow-Origin', '*')
				res.write(`\n`)
				resolve(null)
			}).then(() => {
				new Promise((resolve, reject) => {
					client.on('message', function (topic, message) {
						try {
							let msg = sensor.filter(message.toString('utf-8'), req.headers[':path'].split('/')[1])
							res.write("event: message\ndata: " + msg + "\n\n")
						} catch (err) {
							res.end()
						}
					});
				}).then(() => {
					// res.end();
				})
			})
		}

	}
).listen(
	3001, () => {
		console.log("http/2 on port 3001");
	}
)