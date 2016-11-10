var uri="/socket-mini.html"; // the name of your HTML page

var fs = require('fs'),
    http = require('http'),
    socket = require("socket.io");

var page = fs.readFileSync(__dirname + uri);

function handler(request, response)
{
  response.write(page); 
  response.end(); 
}

var app = http.createServer(function(r, s){ handler(r,s); });
app.listen(1000);

var listener = socket.listen(app, { log: false });

function start(socket) 
{
  socket.emit('notification', 'Server online via socket!');
    
  socket.on('called', function () {
    console.log("Request received.");
    listener.sockets.emit('notification', 'Yes still here! Want some data?');
  });    
}

listener.sockets.on('connection', function (socket) { start(socket);} );

