<?php
	include '../connect.php';

	if ('POST' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$person = (array) json_decode($json);

		$sql = "insert into test_methods values(NULL, '" 
			. $person['name'] . "')";

		$conn->query($sql);
	}
?>