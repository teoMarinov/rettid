<?php


require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/Signup.php";


$username = "";
$nickname = "";
$password = "";
$email = "";

function signup($username, $nickname, $password, $email)
{
    $signup = new Signup($username, $nickname, $password, $email);
    $signup->createNewUser();
}