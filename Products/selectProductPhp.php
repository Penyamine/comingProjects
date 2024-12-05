<?php
    $servername = "localhost";
    $username = "root";
    $password = ""; // Update with your database password
    $dbname = "product";
    
    $conn=new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) { 
        die("Connection failed: " . $conn->connect_error); 
    }

    $sql = "SELECT * FROM product_detail"; 
    $result = $conn->query($sql); 
    $data = array(); 
    if ($result->num_rows > 0) { 
        while($row = $result->fetch_assoc()) { 
            $row['product_image']=base64_encode($row['product_image']);
            $data[] = $row; 
        } 
    }
     $conn->close();
     echo json_encode($data);
?>