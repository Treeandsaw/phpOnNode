<?php
echo "phpback.php here...\n";
echo $argc-1, " infos received from HTML interface.\n\n";

for($i = 1; $i < $argc; $i++)
{
	$p = $argv[$i];
	list($k, $v) = explode('=', $p);
	echo $k, "=", $v, "\n";
}

echo "\nReady to use them, add your code to the source...";
?>