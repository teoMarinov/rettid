<?php

require_once "../Classes/DbConnect.php";
require_once "../Classes/Signup.php";


$username = "";
$nickname = "";
$password = "";
$email = "";


 function signup( $username, $nickname, $password, $email ) {
     $signup = new Signup($username, $nickname, $password, $email);
     $signup->createNewUser();
    }