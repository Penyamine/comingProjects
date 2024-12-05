<?php
  $servername = "localhost";
  $username = "root";
  $password = ""; // Update with your database password
  $dbname = "product";

  $conn=new mysqli($servername, $username, $password, $dbname);

  if($conn->connect_error)
      die("Connection error ");

  $username=$_POST['username'];
  $password=$_POST['password']; 
  
  $sql="select *from admin_detail where user_name=? and password=?";
  $stmt=$conn->prepare($sql);
  $stmt->bind_param('ss',$username,$password);
  $stmt->execute();
  $stmt->store_result();
    if($stmt->num_rows()>0)
    {
        echo json_encode(['success'=>'Welcome']);
        exit;
    }
    else{
        echo json_encode(['error'=>'Sorry Contact Admin ....']);
        exit;
    }
?>