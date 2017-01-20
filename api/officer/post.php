<?php
	include '../connect.php';

	if ('POST' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$person = (array) json_decode($json);

		$sql = "insert into officer values(NULL, '" 
			. $person['official_id'] . "', '" 
			. $person['name'] . "')";

		$conn->query($sql);
	}
?>