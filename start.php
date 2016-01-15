<?php
/**
 * 开始某一个任务
 */

// 引入数据库连接文件
include 'inc.php';

$d = date('m-d H:i');
if(!empty($_POST['id'])){
	$sql = "UPDATE todo_table SET todo_status = '已开始@$d' WHERE id = '{$_POST['id']}'";
	mysqli_query($conn, $sql);
    echo '{"id": "'.$_POST['id'].'"}';
} else {
    echo '{}';
}
mysqli_close($conn);
?>