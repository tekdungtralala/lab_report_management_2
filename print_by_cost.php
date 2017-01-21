<?php
	session_start();
	$r = $_SESSION["reports"];
		echo "totalRP : ".$r['totalRP']."<br/>";
		foreach ($r['reports'] as $re) {
			echo "_tanggal: ".$re->received_dt."<br/>";
			echo "_nama: ".$re->nama_pelanggan."<br/>";
			echo "_kondisi: ".$re->sample_condition."<br/>";
			echo "_tipe: ".$re->sample_type."<br/>";
			echo "_total_sample: ".$re->total_sample."<br/>";
			echo "_total_priceRP: ".$re->total_priceRP."<br/>";
			echo "_<br/>";
		}
?>