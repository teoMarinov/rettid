<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/Login.php";

function login($username, $password, $token)
{
    $login = new Login($username, $password, $token);
    $login->loginUser();
}