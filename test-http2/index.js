// const http2 = require('http2');
// const fs = require('fs');

// const server = http2.createSecureServer({
//     key: fs.readFileSync('localhost-privkey.pem'),
//     cert: fs.readFileSync('localhost-cert.pem')
// });

// try{
// server.on('stream', (stream, headers) => {
//     // stream is a Duplex
//     stream.respond({
//         ':status': 200,
//         'content-type': 'application/json',
//     });
//     countdown(stream, 120)
// });
// }catch(er){
//     console.log(er);
// }

// server.on('error', (err) => console.log(err));

// function countdown(stream, count) {

//     let now = new Date()
//     try{
//         stream.write("event: message\ndata: " + now.toLocaleString() + "\n\n")
//     }catch(err){
//         // console.log(err);
//     }
//     if (count)
//         setTimeout(() => countdown(stream, count - 1), 1000)
//     else
//         stream.end()
// }

// server.listen(3000);

const fs = require('fs');
const http2 = require('http2');

const HTTPSoptions = {
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
};
const template = `
<!DOCTYPE html> 
<html>
<body>
	<p id="pesan"></p>
    <script type="text/javascript">
        const  source = new EventSource('/sse/');
        source.onmessage = function(e) { 
            document.getElementById("pesan").innerHTML += e.data + '<br>';
        };
    </script>
</body>
</html>
`;


const server = http2.createSecureServer(HTTPSoptions);

try{
	server.on('request', (req, res) => {
		req.socket.setKeepAlive(true);

		if(req.url === '/sse/') {

        res.writeHead(200, {
			'Content-Type': 'text/event-stream', // <- Important headers
            'Cache-Control': 'no-cache'
        });
		res.write('\n');
		// for(let i = 0; i<100;i++){
			// try{
				// let a = setInterval(() => {
				// 	res.write(`data: ${Math.random()}\n\n`)
				// 	clearInterval(a)
				// }, 200);
			// }catch(err){
			// 	console.log(err);
			// }
			// res.write(`data: tes\n\n`)
			res.write(`data: ${Math.random()}\n\n`)
		// }
		res.end(template)
    } else {
        res.end(template);
    }
});
}catch(err){
	console.log('s');
}

server.listen(4001);