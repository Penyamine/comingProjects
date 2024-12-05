<?php

    header('Content-Type: text/html');

      $servername = "localhost";
      $username = "root";
      $password = ""; // Update with your database password
      $dbname = "product";
    
      $conn=new mysqli($servername, $username, $password, $dbname);
    
      if($conn->connect_error)
          die("Connection error ");
    
          $sql="select phone_number from admin_detail ";

          $result = $conn->query($sql); 
          $data = array(); 
          if ($result->num_rows > 0) {
             // Output data of each row 
            while($row = $result->fetch_assoc()) 
            { 
                $data[] = $row; 
            } 
            echo json_encode($data);
        }
        
?>