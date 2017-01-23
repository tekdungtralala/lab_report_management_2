<?php
include '../connect.php';

$sql = "SELECT r.*, p.nama as person_name, p.alamat as person_address, p.id as person_id, o.name as officer_name, o.official_id as officer_official_id, p.kode_plg as person_kode_plg FROM pps r, pelanggan p, officer o WHERE p.id = r.id_person and r.state = 4 and r.officer_id = o.id";
$result = $conn->query($sql);
$rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
         $rows[] = $row;
    }
}
print json_encode($rows);
?>