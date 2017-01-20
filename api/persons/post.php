<?php
	include '../connect.php';

	if ('POST' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		// echo $json;
		$person = (array) json_decode($json);
					$sql = "select  * from pelanggan order by id desc limit 1";
	$result = $conn->query($sql);
	$number = 1;
		if ($result->num_rows > 0) {
	    $row = $result->fetch_assoc();
		$numberx = explode("/",$row["kode_plg"]);
		$number = $numberx[0]+1;
		}

		$sql = "insert into pelanggan values(NULL, '" 
			. $number."/SMP/An/BTPAL/16" . "', '" 
			. $person['name'] . "', '" 
			. $person['address'] . "', '" 
			. $person['hp'] . "', '" 
			. $person['email'] . "', '" 
			. $person['desc'] . "')";

		$conn->query($sql);

	}
?>