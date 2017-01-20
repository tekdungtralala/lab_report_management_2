<?php
	session_start();
	foreach ($_SESSION["reports"] as $r) {
		echo "personID : ".$r->personId."<br/>";
		echo "nama : ".$r->name."<br/>";
		echo "alamat : ".$r->address."<br/>";
		echo "email : ".$r->email."<br/>";
		echo "hp : ".$r->phoneNumber."<br/>";
		foreach ($r->reports as $re) {
			echo "_tanggal: ".$re->received_dt."<br/>";
			echo "_kondisi: ".$re->sample_condition."<br/>";
			echo "_tipe: ".$re->sample_type."<br/>";
			echo "_total_sample: ".$re->total_sample."<br/>";
			echo "_<br/>";
		}

	}
?>