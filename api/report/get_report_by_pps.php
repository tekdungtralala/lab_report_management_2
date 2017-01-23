<?php
include '../connect.php';

$from = $_GET['from'];
$to =  $_GET['to'];

$sql = "SELECT a.nama as nama_pelanggan, a.kode_plg as kode_plg, b.* FROM pelanggan a, pps b WHERE a.id = b.id_person && b.received_dt >= '$from' && b.received_dt <= '$to' ORDER BY b.received_dt ASC";
$result = $conn->query($sql);
$rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
         $rows[] = $row;
    }
}
print json_encode($rows);
?>