<?php
/**
 * 删除某一个任务
 */

// 引入数据库连接文件
include 'inc.php';

if(!empty($_POST['id'])){

	$sql = "DELETE FROM todo_table WHERE id = '{$_POST['id']}'";
	mysqli_query($conn, $sql);
    echo '{"id": "'.$_POST['id'].'"}';
} else {
    echo '{}';
}
mysqli_close($conn);
?>