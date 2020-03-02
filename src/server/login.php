<?php

  // 1. 接收前端的参数
  $username = $_POST['username'];
  $password = $_POST['password'];

  // 2. 去数据库验证
  // 2-1. 连接数据库
  $link = mysqli_connect('localhost', 'root', 'root', 'newdata');

  // 2-2. 执行 sql 语句
  $sql = "SELECT * FROM `login` WHERE `username`='$username' AND `password`='$password'";
  $res = mysqli_query($link, $sql);

  // 2-3. 解析结果
  //      因为是查询, 所以要解析结果
  $row = mysqli_fetch_assoc($res);

  // 2-4. 断开数据库连接
  mysqli_close($link);

  // 3. 返回登录成功或者登录失败
    //   $arr = array(
    //     "message" => "登录成功, 因为没有查询数据库, 所以把参数再给你带回去, 表示我接收到了",
    //     "username" => $username,
    //     "password" => $password
    //   );

  if ($row) {
    $arr = array("message" => "登录成功", "code" => 1,"username" => "$username");
  } else {
    $arr = array("message" => "登录失败", "code" => 0);
  }

  // 把这关联型数组返回
  print_r(json_encode($arr));

  //   echo json_encode($arr);


?>