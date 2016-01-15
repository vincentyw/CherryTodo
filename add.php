<?php
/**
 * 新增一个任务
 */

// 引入数据库连接文件
include 'inc.php';

if(!empty($_POST['todo_task'])&&
	isset($_POST['todo_order'])&&
	!empty($_POST['todo_status'])){
	//INSERT INTO todo_table (todo_task, todo_order, todo_status)VALUE ('math', '1', 'todo');
	$sql = "INSERT INTO todo_table (todo_task, todo_order, todo_status) VALUE ('{$_POST['todo_task']}', '{$_POST['todo_order']}', '{$_POST['todo_status']}')";
	mysqli_query($conn, $sql);

    // 获取刚刚插入的id
    $id = mysqli_insert_id($conn);
    echo '{"id": '.$id.'}';
} else {
    echo '{}';
}
mysqli_close($conn);
?>
