<?php
    $servername = "localhost";
    $username = "root";
    $password = ""; // Update with your database password
    $dbname = "product";

    $conn=new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error)
        die("Connection error ");

    $username=$_POST['username'];
    $email=$_POST['email'];
    $phone=$_POST['phone'];
    $password=$_POST['password']; 
    
    $sql="select *from admin_detail where user_name=? or email=?";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param('ss',$username,$email);
    $stmt->execute();
    $stmt->store_result();
    error_log($stmt->num_rows);
    if($stmt->num_rows>0)
    {
        echo json_encode(['error'=>'This UserName or this Email Exists.... So Give Unique UserName and Email...']);
        exit;
    }

    $sql="insert into admin_detail(user_name,email,phone_number,password) values(?,?,?,?)";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param('ssss',$username,$email,$phone,$password);
    if($stmt->execute())
        echo json_encode(['success'=>'Welcome For being a part of this Organization ']);
    else
        echo json_encode(['Error'=>'Some Issue At this Moment....']);

        $stmt->close();
?>