<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "sql106.infinityfree.com";
$user = "if0_39391565";
$pass = "security-reasons";
$db   = "if0_39391565_Elegancedb";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  echo json_encode([]);
  exit;
}

$result = $conn->query("SELECT * FROM products ORDER BY id DESC");
$products = [];

while ($row = $result->fetch_assoc()) {
  $products[] = $row;
}

echo json_encode($products);
?>
