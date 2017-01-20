<?php
	include '../connect.php';

	if ('DELETE' === $_SERVER['REQUEST_METHOD']) {
		$sql = "DELETE FROM parameter WHERE id=" . $_GET['id'];
		$conn->query($sql);
	}
	
?>