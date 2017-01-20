<?php
	include '../connect.php';

	if ('POST' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$person = (array) json_decode($json);

		$sql = "insert into parameter values(NULL, '" 
			. $person['name'] . "', '" 
			. $person['unit'] . "', '" 
			. $person['price'] . "')";

		$conn->query($sql);
	}
?>