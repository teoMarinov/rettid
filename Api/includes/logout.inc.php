<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/Logout.php";

function logout($token)
{
    $logout = new Logout($token);
    $logout->logoutUser();
}
