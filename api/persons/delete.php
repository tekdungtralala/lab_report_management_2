<?php
	include '../connect.php';

	if ('DELETE' === $_SERVER['REQUEST_METHOD']) {
		$sql = "DELETE FROM pelanggan WHERE id=" . $_GET['id'];
		$conn->query($sql);
	}
	
?>