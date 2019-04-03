const fs = require('fs');
const http2 = require('http2');

http2.createSecureServer({
	key: fs.readFileSync('localhost-privkey.pem'),
	cert: fs.readFileSync('localhost-cert.pem'),
},
	(req, res) => {
		new Promise((resolve) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/event-stream');
			res.setHeader('Cache-Control', 'no-cache')
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.write(`\n`)
			resolve(null)
		}).then(() => {
			new Promise((resolve) => {
				setTimeout(() => {
					res.write(`event: message\n`)
					res.write(`data: s\n\n`)
					resolve(null)
				}, 5000);
			}).then(() => {
				res.end();
			})
		})

	}
).listen(
	4001
);
