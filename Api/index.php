<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once "./includes/signup.inc.php";

$method = $_SERVER["REQUEST_METHOD"];
$path = $_SERVER["REQUEST_URI"];

switch ($method) { 
    case "POST":
        $data = json_decode(file_get_contents("php://input"), 1);
        $username = $data["username"];
        $nickname = $data["nickname"];
        $password = $data["password"];
        $email = $data["email"];
        echo $path;
        signup($username, $nickname, $password, $email);
}
