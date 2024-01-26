<?php


require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/GetPosts.php";
require_once __DIR__ . "/../Classes/GetSubInfo.php";

function get_sub_info($title)
{
    $subInfo = new GetSubInfo($title);
    $subInfo->getSubInfo();
}