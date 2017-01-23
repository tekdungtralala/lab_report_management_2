<?php
	include '../connect.php';

	if ('POST' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$sql = "insert into pps values(NULL"
			. ", '" . $_GET['id_person'] . "'"
			. ", '" . $_GET['received_dt'] . "'"
			. ", '" . $_GET['analisis_dt'] . "'"
			. ", '" . $_GET['sample_condition'] . "'"
			. ", '" . $_GET['sample_type'] . "'"
			. ", '" . $_GET['total_sample'] . "'"
			. ", '" . $_GET['total_price'] . "'"
			. ", '" . $json . "'"
			. ", 1, NULL, NULL, NULL);";

		$conn->query($sql);
	}
?>