<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/CheckEmailExists.php";

function check_email_exists($email)
{
    $emailCheck = new CheckEmailExists($email);
    $emailCheck->checkForEmail();
}