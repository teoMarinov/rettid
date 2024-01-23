<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/Login.php";

function login($username, $password)
{
    $login = new Login($username, $password);
    $login->loginUser();
}