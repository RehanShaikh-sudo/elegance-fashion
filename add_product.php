<?php
// Show errors during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// DB credentials
$host = "sql106.infinityfree.com";         // ✅ Your InfinityFree MySQL host
$user = "if0_39391565";                    // ✅ Your database username
$pass = "security-reasons";                       // ✅ Your database password
$db   = "if0_39391565_Elegancedb";         // ✅ Your database name

// Create DB connection
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  echo json_encode(["success" => false, "error" => "DB connection failed"]);
  exit;
}

// Read input JSON
$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"] ?? "";
$price = (int)($data["price"] ?? 0);
$category = $data["category"] ?? "";
$image = $data["image"] ?? "";
$description = $data["description"] ?? "";
$stock = (int)($data["stock"] ?? 0);

// Basic validation
if (!$name || !$price || !$category || !$image || !$description) {
  echo json_encode(["success" => false, "error" => "Missing fields"]);
  exit;
}

// Prepare and insert into DB
$stmt = $conn->prepare("INSERT INTO products (name, price, category, image, description, stock) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sisssi", $name, $price, $category, $image, $description, $stock);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
