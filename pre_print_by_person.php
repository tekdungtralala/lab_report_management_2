<?php
	$json = file_get_contents('php://input');
	$reports = (array) json_decode($json);
	session_start();
	$_SESSION["reports"] = $reports;
?>