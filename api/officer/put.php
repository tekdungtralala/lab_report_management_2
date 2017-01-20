<?php
	include '../connect.php';
	if ('PUT' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$person = (array) json_decode($json);
		$sql = "update officer" 
			. " set name='". $person['name'] . "'" 
			. " , official_id='". $person['official_id'] . "'" 
			. " where id=" . $person['id'];
		$conn->query($sql);
	}
?>