<?php
	session_start();
	foreach ($_SESSION["reports"] as $r) {
		echo "status : ".$r->state."<br/>";
		if (1 == $r->state) {
			echo "PPS Baru"."<br/>";
		}
		if (2 == $r->state) {
			echo "Ajukan Disposisi"."<br/>";
		}
		if (3 == $r->state) {
			echo "Proses Rekap Uji"."<br/>";
		}
		if (4 == $r->state) {
			echo "Selesai"."<br/>";
		}
		foreach ($r->reports as $re) {
			echo "_tanggal: ".$re->received_dt."<br/>";
			echo "_kondisi: ".$re->sample_condition."<br/>";
			echo "_tipe: ".$re->sample_type."<br/>";
			echo "_total_sample: ".$re->total_sample."<br/>";
			echo "_<br/>";
		}

	}
?>