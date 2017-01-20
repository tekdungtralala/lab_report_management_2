<?php
//============================================================+
// File name   : example_048.php
// Begin       : 2009-03-20
// Last Update : 2013-05-14
//
// Description : Example 048 for TCPDF class
//               HTML tables and table headers
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: HTML tables and table headers
 * @author Nicola Asuni
 * @since 2009-03-20
 */

// Include the main TCPDF library (search for installation path).
//require_once('tcpdf_include.php');

include 'api/connect.php';
	
require('tcpdf/tcpdf.php');

// Extend the TCPDF class to create custom Header and Footer
class MYPDF extends TCPDF {

	//Page header
	public function Header() {
		// Logo
		$image_file = K_PATH_IMAGES.'logobppt.jpg';
		$this->Image($image_file, 20, 26, 30, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
		$image_file = K_PATH_IMAGES.'logo.png';
		$this->Image($image_file, 162, 26, 30, '', 'PNG', '', 'T', false, 300, '', false, false, 0, false, false, false);
		// Set font
		$this->SetFont('helvetica', 'B', 20);
		// Title
		$this->Cell(0, 15, '', 0, false, 'C', 0, '', 0, false, 'M', 'M');
		
	}

	// Page footer
	public function Footer() {
		// Position at 15 mm from bottom
		$this->SetY(-15);
		// Set font
		$this->SetFont('helvetica', 'I', 8);
		// Page number
		$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
	}
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);


// set document information
//$pdf->SetCreator(PDF_CREATOR);
//$pdf->SetAuthor('Rendi');
//$pdf->SetTitle('TCPDF Example 048');
//$pdf->SetSubject('TCPDF Tutorial');
//$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 048', PDF_HEADER_STRING);

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
	require_once(dirname(__FILE__).'/lang/eng.php');
	$pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
//$pdf->SetFont('helvetica', 'B', 14);


$pdf->Header();
// add a page
$pdf->AddPage();

$pdf->SetFont('helvetica', 'B', 12);
// set some text to print
$txt = <<<EOD
BALAI TEKNOLOGI PENGOLAHAN AIR DAN LIMBAH
BADAN PENGKAJIAN DAN PENERAPAN TEKNOLOGI
EOD;


$txt1 = <<<EOD
Gedung 820 - Geostech BPPT, Puspiptek Serpong 
Kota Tangerang Selatan, Provinsi Banten 15314 
Tel./Fax : 021-75791377 Ext. 4083
EOD;

// print a block of text using Write()
$pdf->Write(0, $txt, '', 0, 'C', true, 0, false, false, 0);
$pdf->SetFont('helvetica', 'B', 8);
$pdf->Write(0, $txt1, '', 0, 'C', true, 0, false, false, 0);
$pdf->Write(0, '', '', 0, 'R', true, 0, false, false, 0);
$pdf->Write(0, '', '', 0, 'R', true, 0, false, false, 0);

$pdf->SetFont('helvetica', 'B', 12);
$admin = '<u>LAPORAN HASIL UJI</u>';
$pdf->writeHTML($admin, '', '', 0, 'C', true, 0, false, false, 0);
$pdf->Write(0, '', '', 0, 'R', true, 0, false, false, 0);

$pdf->SetFont('helvetica', '', 12);

// -----------------------------------------------------------------------------
$sql = "SELECT r.*, p.kode_plg as kode_name, p.nama as person_name, p.alamat as person_address, p.id as person_id, o.name as officer_name, o.official_id as officer_official_id FROM pps r, pelanggan p, officer o WHERE p.id = r.id_person and r.state = 4 and r.officer_id = o.id and r.id = " . $_GET['id'];
	$result = $conn->query($sql);
	$html = "";
if ($result->num_rows > 0) {
	    $row = $result->fetch_assoc();
	    
		$html.= "Nomor Order : " . $row["kode_name"];$html.= '<br/>';
	    $html.= "Pelanggan : " . $row["person_name"];$html.= '<br/>';
	    $html.= "Alamat : " . $row["person_address"];$html.= '<br/>';
		$html.= "Tanggal Terima : " . $row["received_dt"];$html.= '<br/>';
	    $html.= "Tanggal Analisis: " . $row["analisis_dt"];$html.= '<br/>';
	    $html.= "Kondisi Sampel: " . $row["sample_condition"];$html.= '<br/>';
	    $html.= "Tipe Sampel: " . $row["sample_type"];$html.= '<br/>';
	    $html.= "Total Sampel: " . $row["total_sample"];$html.= '<br/>';
	    
	    $obj = json_decode($row['json'], true);
		$tbl = '
<table border="1" cellpadding="1" cellspacing="1">
<thead>
  <tr style="font:bold 16px helvetica;color:black;">
    <th align="center">Kode Sampel</th>
    <th align="center">Parameter</th>
	<th width="80" align="center">Satuan</th>
    <th width="80" align="center">Hasil</th>
    <th width="220" align="center">Metode</th>
  </tr>
  </thead>';		
		for ($x = 0; $x < count($obj); $x++) {
			$parameters = $obj[$x]["parameters"];
			$tbl .= '<tr>
					<td align="center" rowspan="'.count($parameters).'"> '.$obj[$x]["sampleCode"].'</td>
					<td align="center">'.$parameters[0]['name'].'</td>
					<td width="80" align="center">mg/L</td>
					<td width="80" align="center">'.$parameters[0]['result'].'</td>
					<td width="220" align="center">'.$parameters[0]['method'].'</td>
				  </tr>';
			for ($y =1; $y < count($parameters); $y++) {
				  $tbl.='<tr>
						<td align="center">'.$parameters[$y]['name'].'</td>
						<td width="80" align="center">mg/L</td>
						<td width="80" align="center">'.$parameters[$y]['result'].'</td>
						<td width="220" align="center">'.$parameters[$y]['method'].'</td>
					  </tr>';
				}
				
			  $tbl.='<tr>
				<td colspan="5"></td>
			  </tr>';
		}
$tbl.='</table>';		
	}



$pdf->writeHTML($html, true, false, false, false, '');
$pdf->writeHTML($tbl, true, false, false, false, '');


	
// set font
$pdf->SetFont('helvetica', '', 12);
$pdf->Write(0, 'Serpong, '.date("d/m/Y"), '', 0, 'R', true, 0, false, false, 0);
// $pdf->Cell(20,0.7,"Nomor Order       	 : ".date("d/m/Y"),10,10,'L'); 
$pdf->Write(0, '', '', 0, 'R', true, 0, false, false, 0);
$pdf->Write(0, '', '', 0, 'R', true, 0, false, false, 0);
$pdf->Write(0, 'Susi Sulistia, SSi', '', 0, 'R', true, 0, false, false, 0);
$pdf->Write(0, 'Manajer Teknis', '', 0, 'R', true, 0, false, false, 0);


//Close and output PDF document
$pdf->Output('laporan hasil uji lab.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
