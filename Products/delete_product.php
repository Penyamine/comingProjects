<?php

header('Content-Type: application/json');


    $servername = "localhost";
    $username = "root";
    $password = ""; // Update with your DB password
    $dbname = "product";
    
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database connection failed"]);
        exit;
    }
    $product_id = $_GET['product_id'] ?? '';

    if (!$product_id) {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Product ID is required"]);
        exit;
    }

    $sql = "delete from product_detail WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$product_id);
    $stmt->execute();
    if ($stmt->execute() === false) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Query execution failed"]);
        exit;
    }
    else
    {
        echo json_encode(['success'=>true]);        
    }
    $stmt->close();       
    $conn->close();
?>