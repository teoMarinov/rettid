<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/CheckUsernameExists.php";

function check_username_exists($username)
{
    $usernameCheck = new CheckUsernameExists($username);
    $usernameCheck->checkForUsername();
}