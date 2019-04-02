var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
	// process HTTP request. Since we're writing just WebSockets
	// server we don't have to implement anything.
	console.log(request.headers);
	response.writeHead(404);
	response.end();
});

server.listen(1337, function () { console.log(`websocket on port 1337!`) });

var wsServer = new WebSocketServer({
	httpServer: server
});

//   function originIsAllowed(origin) {
// 	// put logic here to detect whether the specified origin is allowed.
// 	return true;
//   }


// function interactBroker(callback) {
// 	var newMsg = null;
// 	return {
// 		getNewMsg: function () { return newMsg; },
// 		setNewMsg: function (p) { newMsg = p; callback(newMsg); }
// 	};
// }

// var messageBroker = interactBroker(function (newMsg) {

// 	var msg = newMsg
// 	console.log(msg);

wsServer.on('request', function (request) {
	// if (!originIsAllowed(request.origin)) {
	//   // Make sure we only accept requests from an allowed origin
	//   request.reject();
	//   console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
	//   return;
	// }

	var connection = request.accept()

	// connection.sendUTF(msg);


	console.log((new Date()) + ' Connection accepted.');
	connection.on('message', function (message) {
		console.log("pesan : " + message.utf8Data);
		wsServer.broadcast(message.utf8Data)
		// countdownws(connection, message, 10)
	});
	connection.on('close', function (reasonCode, description) {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});
});

// });

// function countdownws(con, message, count) {

// 	let now = new Date()

// 	if (message.type === 'utf8') {
// 		console.log('Received Message: ' + message.utf8Data);
// 		con.sendUTF(now.toLocaleString());
// 	}
// 	else if (message.type === 'binary') {
// 		console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
// 		con.sendBytes(now.toLocaleString());
// 	}

// 	if (message.utf8Data === "close") {
// 		con.close()
// 	}

// 	if (count)
// 		setTimeout(() => countdownws(con, message, count - 1), 1000)
// 	else
// 		con.close()
// }


