<?php
/**
 * 数据库连接文件
 */
date_default_timezone_set('prc');

@define(DB_HOST, 'localhost');
@define(DB_USER, 'vincent77');
@define(DB_PWD, 'jdz8445607');
@define(DB_NAME, 'vincent77');
@define(DB_TABLE, 'todo_table');

$conn = new mysqli(DB_HOST , DB_USER , DB_PWD , DB_NAME);

if($conn){
    #echo "Success to connect to MySQL";
}else{
    #echo "Failed to connect to MySQL";
}