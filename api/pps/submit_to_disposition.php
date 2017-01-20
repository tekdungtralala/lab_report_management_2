<?php
	include '../connect.php';

	if ('PUT' === $_SERVER['REQUEST_METHOD']) {
		$obj = (array) json_decode($json);
		$sql = "update pps SET "
			. "  state = '2'"
			. " WHERE id= " . $_GET['id'];

		$conn->query($sql);
	}
?>