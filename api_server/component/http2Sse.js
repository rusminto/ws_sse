const spdy = require('spdy')
const path = require('path')
const http2 = require('http2');
const fs = require('fs');


let options = {
	key: fs.readFileSync('./cert/server.key'),
	cert: fs.readFileSync('./cert/server.crt')
}



// const server3 = http2.createSecureServer(options, (req, res) => {
// 	res.writeHead(200, {
// 		'Content-Type': 'text/event-stream',
// 		'Cache-Control': 'no-cache'
// 	});
// 	res.write('\n');
// 	countdown(res, 10)
// });
// server3.listen(3000);



const server2 = http2.createSecureServer(options, onRequest).listen(3001,
	function () { console.log(`http2 on port 3001!`) });

// try {
// 	server2.on('stream', (stream, headers) => {
// 		// stream is a Duplex
// 		// stream.setKeepAlive(true);
// 		// console.log(stream);
// 		stream.writeHead(200,{
// 			'Content-Type': 'text/event-stream',
// 			'Cache-Control': 'no-cache'
// 		});
// 		stream.write('\n');
// 		// countdown(stream, 40)
// 		stream.write("event: message\ndata: we\n\n")
// 		stream.end()
// 	});
// } catch (er) {
// 	console.log(er);
// }

function onRequest(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache'
	});
	res.write('\n');
	// res.write("event: message\ndata: we\n\n")
	countdown(res, 40)
	res.end()
}

server2.on('error', (err) => console.log(err));




// const server4 = http2.createSecureServer(options);

// server4.on('request', (req, res) => {


// 	req.socket.setKeepAlive(true);
// 	res.writeHead(200, {
// 		'Content-Type': 'text/event-stream', // <- Important headers
// 		'Cache-Control': 'no-cache'
// 	});
// 	res.write('\n');

// 	countdown(res, 10)
// });

// server4.listen(3002);

// const post = (url, path, body) => new Promise((resolve) => {
//     const client = http2.connect(url);

//     const buffer = new Buffer(JSON.stringify(body));

//     const req = client.request({
//         [http2.constants.HTTP2_HEADER_SCHEME]: "https",
//         [http2.constants.HTTP2_HEADER_METHOD]: http2.constants.HTTP2_METHOD_POST,
//         [http2.constants.HTTP2_HEADER_PATH]: `/${path}`,
//         "Content-Type": "application/json",
//         "Content-Length": buffer.length,
//     });

//     req.setEncoding('utf8');
//     let data = [];
//     req.on('data', (chunk) => {
//         data.push(chunk);
//     });
//     req.write(buffer);
//     req.end();
//     req.on('end', () => {
//         resolve(data: data.join());
//     });
// });