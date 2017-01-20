<?php
	include 'api/connect.php';
	require('pdf/html_table.php');
	
	
$pdf->AddPage();
$pdf=new PDF();
$pdf->SetFont('Arial', '', 12);


$sql = "SELECT r.*, p.nama as person_name, p.alamat as person_address, p.id as person_id, o.name as officer_name, o.official_id as officer_official_id FROM pps r, pelanggan p, officer o WHERE p.id = r.id_person and r.state = 4 and r.officer_id = o.id and r.id = " . $_GET['id'];
	$result = $conn->query($sql);
$html='<table border="1">
<tr>';
	if ($result->num_rows > 0) {
	    $row = $result->fetch_assoc();
	    $html .= "report id: " . $row["id"];$html.= '<br/>';
	    $html.= "received_dt: " . $row["received_dt"];$html.= '<br/>';
	    $html.= "analisis_dt: " . $row["analisis_dt"];$html.= '<br/>';
	    $html.= "Kondisi sample: " . $row["sample_condition"];$html.= '<br/>';
	    $html.= "Tipe sample: " . $row["sample_type"];$html.= '<br/>';
	    $html.= "Total sample: " . $row["total_sample"];$html.= '<br/>';
	    $html.= "Total Biaya: " . $row["total_price"];$html.= '<br/>';
	    $html.= '<br/>';
	    $html.= "Pelanggan : " . $row["person_name"];$html.= '<br/>';
	    $html.= "Alamat : " . $row["person_address"];$html.= '<br/>';
	    $html.= '<br/>';
	    $html.= "Nip petugas : " . $row["officer_official_id"];$html.= '<br/>';
	    $html.= "Nama petugas : " . $row["officer_name"];$html.= '<br/>';
	    $html.= '<br/>';
	    $html.= 'Samples<br/>';
	    $obj = json_decode($row['json'], true);
		for ($x = 0; $x < count($obj); $x++) {
			$html.= '_sample ' . ($x + 1) . '<br/>';
			$html.= '__sample code = '.$obj[$x]["sampleCode"];$html.= '<br/>';
			$html.= '__Total Parameter = '.count($obj[$x]["parameters"]);$html.= '<br/>';
			$html.= '<br/>';
			$parameters = $obj[$x]["parameters"];
			for ($y =0; $y < count($parameters); $y++) {
				$html.= '____parameter ' . ($y + 1) . '<br/>';
				$html.= '______name= '.$parameters[$y]['name'];$html.= '<br/>';
				$html.= '______unit= '.$parameters[$y]['unit'];$html.= '<br/>';
				$html .= '<td width="200" height="30">______name= '.$parameters[$y]['name'].'</td><td width="200" height="30">cell 4</td>';
				$html.= '______price= '.$parameters[$y]['price'];$html.= '<br/>';
				$html.= '______priceRp= '.$parameters[$y]['priceRp'];$html.= '<br/>';
				$html.= '______total= '.$parameters[$y]['total'];$html.= '<br/>';
				$html.= '______totalRp= '.$parameters[$y]['totalRp'];$html.= '<br/>';
				$html.= '______hasil= '.$parameters[$y]['result'];$html.= '<br/>';
				$html.= '______metode= '.$parameters[$y]['method'];$html.= '<br/>';$html.= '<br/>';
			}
		} 
	}
	$html.= '<br/>';
	$html.= '<br/>';
	$html.= "<br/><br/>end";
	$html .= '</tr></table>';

$pdf->WriteHTML($html);
$pdf->Output();

?>