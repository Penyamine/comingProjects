<?php

    header('Content-Type: application/json');

    $servername = "localhost";
    $username = "root";
    $password = ""; // Update with your database password
    $dbname = "product";

    $conn=new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error)
        die("Connection error ");

    if($_SERVER['REQUEST_METHOD']=='POST' )
    {
        $product_id=$_POST['product-id-for-add'];
        $product_name=$_POST['product-name-for-add'];
        $product_desc=$_POST['product-desc-for-add'];

        $image_data=file_get_contents($_FILES['product-image-for-add']['tmp_name']);
        $image_type=$_FILES['product-image-for-add']['type'];
        if(strpos($image_type,'image')===false)
            die("Only Image Files are Allowed!!!!");

        $stmt=$conn->prepare('select * from product_detail where product_id=?');
        $stmt->bind_param('i',$product_id);
        $stmt->execute();
        $stmt->store_result();
        if($stmt->num_rows>0)
        {
            echo json_encode(['error'=>"This Product Id Exists.... So Give Unique One..."]);
            exit;
        }

        $stmt=$conn->prepare("insert into product_detail(product_id,product_name,
        product_description,product_image) values(?,?,?,?)");
        $stmt->bind_param("issb",$product_id,$product_name,$product_desc,$null);
        $stmt->send_long_data(3, $image_data);

        if($stmt->execute())
            echo json_encode(['success'=> 'New Product Added Succesfully']);

//        echo "New Record Created Successfully";
        else
            echo json_encode(['error'=> 'Some Issue To Add This Product at this Moment!!!']);

            $stmt->close();
    }
?>