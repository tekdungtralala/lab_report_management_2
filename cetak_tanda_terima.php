<?php
	session_start();
	$r = $_SESSION["reports"];
	echo "<br/><br/>";
	echo "kode sample = ".$r['formValue']->person->kode_plg."<br/>";
	echo "Nama Pelanggan = ".$r['formValue']->person->nama."<br/>";
	echo "Jenis Industri = ".$r['formValue']->person->jenis_industri."<br/>";
	echo "Alamat = ".$r['formValue']->person->alamat."<br/>";
	echo "KEterangan = ".$r['formValue']->person->ket."<br/>";
	echo "Tanggal Terima = ".$r['formValue']->received_dtStr."<br/>";
	echo "Jenis Sample = ".$r['formValue']->sample_type."<br/>";
	echo "Jumlah Sample = ".$r['formValue']->sample_condition."<br/>";
	echo "<br/>";echo "<br/>";
	foreach ($r['formValue']->samples as $re) {
		echo "__number : ".$re->number."<br/>";
		echo "__sampleCode : ".$re->sampleCode."<br/>";
		foreach ($re->parameters as $p) {
			echo "____parameter_name : ".$p->name."<br/>";
			echo "____parameter_quantity : ".$p->quantity."<br/>";
			echo "____parameter_unit : ".$p->unit."<br/>";
		}
	}
?>