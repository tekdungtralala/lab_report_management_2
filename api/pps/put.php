<?php
	include '../connect.php';

	if ('PUT' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$sql = "update pps SET "
			. "  received_dt = '" . $_GET['received_dt'] . "'"
			. ", analisis_dt = '" . $_GET['analisis_dt'] . "'"
			. ", sample_condition = '" . $_GET['sample_condition'] . "'"
			. ", sample_type = '" . $_GET['sample_type'] . "'"
			. ", total_sample = '" . $_GET['total_sample'] . "'"
			. ", total_price = '" . $_GET['total_price'] . "'"
			. ", json = '" . $json . "'"
			. " WHERE id= " . $_GET['id'];

		$conn->query($sql);
	}
?>