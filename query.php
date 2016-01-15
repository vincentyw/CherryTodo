<?php
/**
 * 查询任务列表
 */

// 引入数据库连接文件
include 'inc.php';

$sql = "SELECT * from todo_table";
$result = mysqli_query($conn, $sql);

$resp = array();
while($row = mysqli_fetch_array($result , MYSQLI_ASSOC)) {
	$resp[] = $row;
}

mysqli_free_result($result);
mysqli_close($conn);

echo json_encode($resp);
?>
