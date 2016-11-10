var http = require("http");;
var fs = require("fs");  
var path = require("path");
var url = require("url");  
var runner = require("child_process");  

function sendError(errCode, errString, response)
{
    response.writeHead(errCode, {"Content-Type": "text/plain;charset=utf-8"});  
    response.write(errString + "\n");  
    response.end(); 
    return false; 
}      

function sendData(err, stdout, stderr, response) 
{      
    if (err) return sendError(500, stderr, response); 
    response.writeHead(200,{"Content-Type": "text/plain;charset=utf-8"});
    response.write(stdout);
    response.end();
}

function runScript(exists, file, param, response)
{
  if(!exists) return sendError(404, 'File not found', response);
  runner.exec("php " + file + " " + param, function(err, stdout, stderr) { sendData(err, stdout, stderr, response); });
}

function php(request, response)
{  
    var urlpath = url.parse(request.url).pathname;
    var param = url.parse(request.url).query;    
    var localpath = path.join(process.cwd(), urlpath); 
    fs.exists(localpath, function(result) { runScript(result, localpath, param, response)});  
}

var server = http.createServer(php);
server.listen(1000);  
console.log("PHP ready to run script given on [http://localhost:1000/run.php]");


console.log('It is from http://www.scriptol.com/javascript/nodejs-php.php')

// Run with: http://127.0.0.1:1000/dirlist.php?x=test  
// 
// 
