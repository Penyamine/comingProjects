<?php

    header('Content-Type: application/json');

    $servername = "localhost";
    $username = "root";
    $password = ""; // Update with your database password
    $dbname = "product";
    
    $conn=new mysqli($servername, $username, $password, $dbname);

    
    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Database connection failed"]);
        exit;
    }

    function updateProductName($conn,$product_id,$product_name)
    {
        $sql="update product_detail set product_name=? where  product_id={$product_id} ";
        $stmt=$conn->prepare($sql);
        $stmt->bind_param('s',$product_name);
        $stmt->execute();

        if($stmt->execute()===false)
        {
            http_response_code(500); // Internal Server Error
            echo json_encode(["error" => "Query execution failed"]);
            exit;    
        }
        else{
          echo json_encode(['success' => 'Product Name Updated Successfully']); 
           $stmt->close();
          exit();
        }
    }
    function updateProductDesc($conn,$product_id,$product_desc)
    {
        $sql="update product_detail set product_description=? where  product_id={$product_id} ";
        $stmt=$conn->prepare($sql);
        $stmt->bind_param('s',$product_desc);
        $stmt->execute();

        if($stmt->execute()===false)
        {
            http_response_code(500); // Internal Server Error
            echo json_encode(["error" => "Query execution failed"]);
            exit;    
        }

        $stmt->close();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') 
    {

        $data = json_decode(file_get_contents('php://input'), true); 
        $product_id = $data['product_id'] ?? ''; 
        if (json_last_error() !== JSON_ERROR_NONE) { 
            echo json_encode(['error' => 'Invalid JSON input']);
             exit; 
            }
        $product_name = $data['product_name'] ?? '';
        $product_desc=$data['product_description']??''; 
               
        if ($product_id && $product_name) 
        { 
            updateProductName($conn, $product_id, $product_name); 
            echo json_encode(['success' => 'Product Name Updated Successfully']); 
            exit();
        } 
        else if($product_id && $product_desc)
        {
            updateProductDesc($conn,$product_id,$product_desc);
            echo json_encode(['success'=> 'Product Desc updated Successfully']);
            exit();
        }
    }  
?>