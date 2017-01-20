<?php
	include '../connect.php';

	if ('PUT' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$sql = "update pps SET "
			. "  json = '" . $json . "'"
			. ", state = '4'"
			. " WHERE id= " . $_GET['id'];
		$conn->query($sql);
	}
?>