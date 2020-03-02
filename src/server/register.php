<?php

  // 1. 接收前端的参数
  $username = $_POST['username'];
  $password = $_POST['password'];

  // 2. 去数据库验证
  // 2-1. 连接数据库
  header('content-type: text/html;charset=utf-8;');

  // 连接数据库
  $link = mysqli_connect('localhost', 'root', 'root', 'newdata');

  // 执行 sql 语句了

  //   执行插入的 sql 语句
  $res = mysqli_query($link, "INSERT INTO `login` (`username`, `password`) VALUES('$username', '$password')");

  // 输出结果看一下
  //   true 表示插入成功
//   print_r($res);

  if ($res) {
    $arr = array("message" => "注册成功", "code" => 1,"username" => "$username");
  } else {
    $arr = array("message" => "注册失败", "code" => 0);
  }

//   // 把这关联型数组返回
  print_r(json_encode($arr));

  //   echo json_encode($arr);


?>