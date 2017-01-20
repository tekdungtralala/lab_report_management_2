<?php
	session_start();
	foreach ($_SESSION["reports"] as $r) {
		echo "official_id : ".$r->official_id."<br/>";
		echo "nama : ".$r->name."<br/>";
		foreach ($r->reports as $re) {
			echo "_tanggal: ".$re->received_dt."<br/>";
			echo "_kondisi: ".$re->sample_condition."<br/>";
			echo "_tipe: ".$re->sample_type."<br/>";
			echo "_total_sample: ".$re->total_sample."<br/>";
			echo "_<br/>";
		}

	}
?>