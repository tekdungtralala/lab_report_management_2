<?php
	include '../connect.php';

	if ('PUT' === $_SERVER['REQUEST_METHOD']) {
		$json = file_get_contents('php://input');
		$person = (array) json_decode($json);

		$sql = "update pelanggan" 
			. " set kode_plg='". $person['kp'] . "'" 
			. " , nama='". $person['name'] . "'" 
			. " , alamat='". $person['address'] . "'" 
			. " , jenis_industri='". $person['jenis_industri'] . "'" 
			. " , hp='". $person['hp'] . "'" 
			. " , email='". $person['email'] . "'" 
			. " , ket='". $person['desc'] . "'"
			. " where id=" . $person['id'];

		$conn->query($sql);
	}
?>