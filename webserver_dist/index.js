const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options  
  return handler(request, response,{
	"redirects": [
	  { "source": "/ws", "destination": "/" },
	  { "source": "/sse1", "destination": "/" },
	  { "source": "/sses", "destination": "/" },
	  { "source": "/sse2", "destination": "/" }
	]
  });
})
var port = 8081
server.listen(port, () => {
  console.log('Running at http://localhost:'+port);
});
// var history = require('connect-history-api-fallback');
// var express = require('express');
// const fs = require('fs')

// var app = express();
// app.use(history()).listen(3000);

// app.get('/index.html', function (req, res) {
// 	return handler(req, res)
// })
