di<?php

// PHP script to demo native and HTML communication

function echoSocket($data)
{
  $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
  if($socket==false) die("Not created");
  socket_connect($socket, '127.0.0.1', '1001')
    or die(socket_strerror(socket_last_error()));
  socket_write($socket, $data);
  socket_close($socket);
}

$data=$argv[1];
echoSocket("You choosen: <b><span style='color:$data'>$data</span></b>.");

?>