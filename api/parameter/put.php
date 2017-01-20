<?php
	include '../connect.php';
	if ('PUT' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$person = (array) json_decode($json);
		$sql = "update parameter" 
			. " set name='". $person['name'] . "'" 
			. " , unit='". $person['unit'] . "'" 
			. " , price='". $person['price'] . "'"
			. " where id=" . $person['id'];
		$conn->query($sql);
	}
?>