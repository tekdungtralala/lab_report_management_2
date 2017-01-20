<?php
	session_start();
	if ($_SESSION["hasLoggedUser"]) {
		header('HTTP/1.0 200 Success');
	} else {
		header('HTTP/1.0 403 Forbidden');
	}
?>