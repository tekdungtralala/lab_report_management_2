<?php
include '../connect.php';

$from = $_GET['from'];
$to =  $_GET['to'];

$sql = "SELECT a.*, b.*, c.nama as nama_pelanggan, c.kode_plg as kode_plg FROM officer a, pps b, pelanggan c WHERE c.id = b.id_person && b.received_dt >= '$from' && b.received_dt <= '$to' && a.id = b.officer_id ORDER BY b.received_dt ASC";

$result = $conn->query($sql);
$rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
         $rows[] = $row;
    }
}
print json_encode($rows);
?>