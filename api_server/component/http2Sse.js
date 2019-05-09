const http2 = require('http2');
const fs = require('fs');
const mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost')
var topics = "arduino-server"

client.subscribe(topics);


http2.createSecureServer({
	key: fs.readFileSync('./cert/server.key'),
	cert: fs.readFileSync('./cert/server.crt')
},
	(req, res) => {

		console.log(req.headers[':method']);
		console.log(req.stream);
		
		if (req.headers[':method'] == 'POST') {
			// console.log(req.stream);
			
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
							res.write("event: message\ndata: " + message.toString('utf-8') + "\n\n")
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