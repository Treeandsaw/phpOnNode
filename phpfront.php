<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Document sans nom</title>
<style type="text/css">
body { background-color: #FFFFFF; }
</style></head>
<script>
function sendForm()
{
	var login = encodeURIComponent(document.form1.login.value);
	var pass = document.form1.password.value;
	var action = document.form1.action;
	document.form1.action = action + "?login=" + login + "&password="+ pass;;
}
</script>
<body>
<h1>My interface</h1>
<fieldset>
<p>Enter data for a PHP script:</p>
<form name="form1" method="post" action="http://127.0.0.1:1000/phpback.php">
  <p>Login  <input type="text" name="login" value="John Doe"></p>
  <p>Password <input type="text" name="password" value="12345"></p>
  <p><input type="submit" value="Run script" onClick="sendForm()"></p>
</form>
</fieldset>
</body>

</html>
