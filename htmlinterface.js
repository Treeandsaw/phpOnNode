http = require("http"),  
path = require("path"),  
url = require("url"),  
qs = require('querystring'),
util = require('util'),
runner = require("child_process");  
fs = require("fs"); 

function sendError(errCode, errString, response)
{
    response.writeHead(errCode, {"Content-Type": "text/plain;charset=utf-8"});  
    response.write("Error: " + errString + "\n");  
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

function sendFile(err, file, response) 
{  
  if(err) return sendError(500, err, response);
  response.writeHead(200);  
  response.write(file, "binary");  
  response.end();    
}  

function runPHP(exists, code, localpath, param, response)
{
  if(!exists) return sendError(404, 'File not found', response);
  
  if(code==1) 
  {
    console.log("exec: php " + localpath + " " + param);
    runner.exec("php " + localpath + " " + param, 
       function(err, stdout, stderr) { sendData(err, stdout, stderr, response); });
    return;
  }
  
  console.log("load: " + localpath);  
  fs.readFile(localpath, "binary", 
    function(err, localpath){ sendFile(err, localpath, response);});     
  
}

function php(request, response)
{  
    var urlpath = url.parse(request.url).pathname;
    code = 0;
    
    if(request.method == 'POST') 
    {
      var data;
      var formData;
      var phpvar="";
      request.on('data', function(chunk) { data = chunk.toString(); });
      request.on('end', function() 
      {
        formData = qs.parse(data);
        //console.log(util.inspect(formData));
        code = 1;
        for(var key in formData)
        {
          phpvar =  phpvar + key + "=" + '"' + formData[key] + '" ';
        }

      });
    }      
    
    var param = url.parse(request.url).query;    
    var localpath = path.join(process.cwd(), urlpath); 
    fs.exists(localpath, function(result) { runPHP(result, code, localpath, phpvar, response)});  
}

var server = http.createServer(php);
server.listen(1000);  
console.log("Server ready to get the HTML interface on port 1000.");  