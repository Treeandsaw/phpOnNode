var http = require('http'); 
var counter = 0;
function f(request, response) 
{
  if(request.url == '/favicon.ico') return;		
  response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
  if(counter == 0)
	response.write(new Date() +'\nServeur en ligne...\nPremière connexion.');
  else
  	response.write((counter + 1) + " ème connexion.");
  response.end();
  counter++;
  console.log(counter + " URL " + request.url);  
}
var server = http.createServer(f);
server.listen(1000);
console.log('Serveur fonctionnant en http://127.0.0.1:1000/');
