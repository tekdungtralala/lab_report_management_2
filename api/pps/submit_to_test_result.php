<?php
	include '../connect.php';

	if ('PUT' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$officer = (array) json_decode($json);

		$sql = "update pps SET "
			. "  state = '3'"
			. " , officer_id = " . $officer['officer_id']
			. " , pps_desc = '" . $officer['pps_desc']  ."'"
			. " , disposition_dt = '" . $officer['disposition_dt']  ."'"
			. " WHERE id= " . $_GET['id'];

		$conn->query($sql);
	}
?>