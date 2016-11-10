var http = require('http'); 
function f(req, response) 
{
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(new Date() +'\nServeur en ligne...');
  response.end();  
}
var server = http.createServer(f);
server.listen(1000);
console.log('Serveur fonctionnant en http://127.0.0.1:1000/');
