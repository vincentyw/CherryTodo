<?php
/**
 * 完成某一个任务
 */

// 引入数据库连接文件
include 'inc.php';

$d = date('m-d H:i');

if(!empty($_POST['id'])){
    // 只查询一条数据
    $sql2 = "SELECT * from todo_table WHERE id = '{$_POST['id']}' LIMIT 1";
    $result2 = mysqli_query($conn, $sql2);

    $row = mysqli_fetch_array($result2 , MYSQLI_ASSOC);
    
	$sql = "UPDATE todo_table SET todo_status = '{$row['todo_status']}<==>已完成@{$d}' WHERE id = '{$_POST['id']}'";
	mysqli_query($conn, $sql);
    echo '{"id": "'.$_POST['id'].'"}';
} else {
    echo '{}';
}
mysqli_close($conn);
?>