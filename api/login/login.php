<?php
include '../connect.php';
if ('POST' === $_SERVER['REQUEST_METHOD']) {
		$success = false;
		$json = file_get_contents('php://input');
		$auth = (array) json_decode($json);
		$sql = "select * from admin where uname='" . $auth['username'] . "'";
		$result = $conn->query($sql);
		$rows = array();
		if ($result->num_rows > 0) {
		    while($row = $result->fetch_assoc()) {
		         if ($row['pass'] == md5($auth['password'])) {
		         	$success = true;
		         }
		    }
		}

		session_start();
		if ($success) {
			header('HTTP/1.0 200 Success');
			$_SESSION["hasLoggedUser"] = true;
		} else {
			header('HTTP/1.0 403 Forbidden');
			$_SESSION["hasLoggedUser"] = false;
		}
}
?>