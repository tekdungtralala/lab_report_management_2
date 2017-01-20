<?php
	include '../connect.php';

	if ('DELETE' === $_SERVER['REQUEST_METHOD']) {
		$sql = "DELETE FROM test_methods WHERE id=" . $_GET['id'];
		$conn->query($sql);
	}
	
?>