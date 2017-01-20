

<?php
	include 'api/connect.php';
	
	require('pdf/fpdf.php');
	
	
	$pdf = new FPDF("L","cm","A4");

	$pdf->SetMargins(2,1,1);
	$pdf->AliasNbPages();
	$pdf->AddPage();
	$pdf->SetFont('Times','B',11);
	$pdf->Image('logo.png',22,1.5,4,2);
	$pdf->Image('logobppt.jpg',3,1.5,4,2);
	
	$pdf->SetFont('Arial','B',14);
	
	$pdf->SetX(4);            
	$pdf->MultiCell(21,0.5,'LABORATORIUM ANALITIK',0,'C');
	$pdf->SetX(4);            
	$pdf->MultiCell(21,0.5,'BALAI TEKNOLOGI PENGOLAHAN AIR DAN LIMBAH',0,'C');
	$pdf->SetX(4);            
	$pdf->MultiCell(21,0.5,'BADAN PENGKAJIAN DAN PENERAPAN TEKNOLOGI',0,'C');
	$pdf->SetX(4);            
	$pdf->MultiCell(21,0.5,'Gedung 820 - Geostech BPPT, Puspiptek, Serpong',0,'C');
	$pdf->SetX(4);            
	$pdf->MultiCell(21,0.5,'Kota Tangerang Selatan, Provinsi Banten 15340',0,'C');
	$pdf->SetX(4);
	$pdf->MultiCell(21,0.5,'Telp/Fax : 021-75791377 Ext.4083',0,'C');    
	$pdf->SetFont('Arial','B',10);
	
	$pdf->Line(2,4.4,27,4.4);
	$pdf->SetLineWidth(0.1);   
	$pdf->Line(2,4.5,27,4.5);   
	$pdf->SetLineWidth(0);
	
	$pdf->ln(1);
	$pdf->SetFont('Arial','B',16);
	$pdf->Cell(24,0.5,"KWITANSI",0,10,'C');
	
	$pdf->ln(0.5);
	$pdf->SetFont('Arial','B',10);
	$pdf->Cell(20,0.7,"Nomor Order       	 : ".date("d/m/Y"),10,10,'L');
	$pdf->ln(0);
	$pdf->Cell(20,0.7,"Sudah Terima Dari 	: ".date("d/m/Y"),10,10,'L');
	$pdf->ln(0);
	$pdf->Cell(20,0.7,"Banyaknya Uang    	: ".date("d/m/Y"),10,10,'L');
	$pdf->ln(0);
	$pdf->Cell(20,0.7,"Untuk Pembayaran  	: Analisa Sampel");
	

	$pdf->ln(1);
	$pdf->SetFont('Arial','B',10);
	$pdf->Cell(1, 0.9, 'No', 1, 0, 'C');
	$pdf->Cell(5, 0.9, 'Tanggal', 1, 0, 'C');
	$pdf->Cell(2, 0.9, 'Suhu', 1, 0, 'C');
	$pdf->Cell(2, 0.9, 'pH', 1, 0, 'C');
	$pdf->Cell(2, 0.9, 'DO', 1, 0, 'C');
	$pdf->Cell(5, 0.9, 'Tinggi', 1, 0, 'C');
	$pdf->Cell(2, 0.9, 'TDS', 1, 1, 'C');
	
	$pdf->ln(1);
	$pdf->SetFont('Arial','',11);
	$pdf->Cell(20,0.7,"Serpong, ".date("d/m/Y"),10,10,'R');
	$pdf->ln(2);
	$pdf->SetFont('Arial','',11);
	$pdf->Cell(20,0.7,"Suherman",10,10,'R');
	$pdf->Line(22,13,19,13,'R');
	$pdf->SetLineWidth(0); 
	$pdf->SetFont('Arial','',11);
	$pdf->Cell(20,0.7,"Administrasi",10,10,'R');
	
	
	
	$pdf->Output("laporan_sensor_all.pdf","I");

	$sql = "SELECT r.*, p.nama as person_name, p.alamat as person_address, p.id as person_id, o.name as officer_name, o.official_id as officer_official_id FROM pps r, pelanggan p, officer o WHERE p.id = r.id_person and r.state = 4 and r.officer_id = o.id and r.id = " . $_GET['id'];
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    $row = $result->fetch_assoc();
	    echo "report id: " . $row["id"];echo '<br/>';
	    echo "received_dt: " . $row["received_dt"];echo '<br/>';
	    echo "analisis_dt: " . $row["analisis_dt"];echo '<br/>';
	    echo "Kondisi sample: " . $row["sample_condition"];echo '<br/>';
	    echo "Tipe sample: " . $row["sample_type"];echo '<br/>';
	    echo "Total sample: " . $row["total_sample"];echo '<br/>';
	    echo "Total Biaya: " . $row["total_price"];echo '<br/>';
	    echo '<br/>';
	    echo "Pelanggan : " . $row["person_name"];echo '<br/>';
	    echo "Alamat : " . $row["person_address"];echo '<br/>';
	    echo '<br/>';
	    echo "Nip petugas : " . $row["officer_official_id"];echo '<br/>';
	    echo "Nama petugas : " . $row["officer_name"];echo '<br/>';
	    echo '<br/>';
	    echo 'Samples<br/>';
	    $obj = json_decode($row['json'], true);
		for ($x = 0; $x < count($obj); $x++) {
			echo '_sample ' . ($x + 1) . '<br/>';
			echo '__sample code = '.$obj[$x]["sampleCode"];echo '<br/>';
			echo '__Total Parameter = '.count($obj[$x]["parameters"]);echo '<br/>';
			echo '<br/>';
			$parameters = $obj[$x]["parameters"];
			for ($y =0; $y < count($parameters); $y++) {
				echo '____parameter ' . ($y + 1) . '<br/>';
				echo '______name= '.$parameters[$y]['name'];echo '<br/>';
				echo '______unit= '.$parameters[$y]['unit'];echo '<br/>';
				echo '______price= '.$parameters[$y]['price'];echo '<br/>';
				echo '______priceRp= '.$parameters[$y]['priceRp'];echo '<br/>';
				echo '______total= '.$parameters[$y]['total'];echo '<br/>';
				echo '______totalRp= '.$parameters[$y]['totalRp'];echo '<br/>';
				echo '______hasil= '.$parameters[$y]['result'];echo '<br/>';
				echo '______metode= '.$parameters[$y]['method'];echo '<br/>';echo '<br/>';
			}
		} 
	}
	echo '<br/>';
	echo '<br/>';
	echo "<br/><br/>end"	
	

?>