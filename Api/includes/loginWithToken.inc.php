<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/LoginWithToken.php";

function login_with_token($token)
{
    $loginWithToken = new LoginWithToken($token);
    $loginWithToken->loginUserWithToken();
}