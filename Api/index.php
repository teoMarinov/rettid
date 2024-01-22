<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER["REQUEST_METHOD"];
$path = explode("/", $_SERVER["REQUEST_URI"]);

switch ($method) {
    case "POST":
        if ($path[3] === "users" && $path[4] === "signup") {
            require_once "./includes/signup.inc.php";
            $data = json_decode(file_get_contents("php://input"), 1);
            $username = $data["username"];
            $nickname = $data["nickname"];
            $password = $data["password"];
            $email = $data["email"];
            signup($username, $nickname, $password, $email);
        }
        if ($path[3] === "users" && $path[4] === "check_username") {
            require_once "./includes/checkUsernameExists.inc.php";
            $username = json_decode(file_get_contents("php://input"), 1);
            check_username_exists($username);
        }
        if ($path[3] === "users" && $path[4] === "check_email") {
            require_once "./includes/checkEmailExists.inc.php";
            $email = json_decode(file_get_contents("php://input"), 1);
            check_email_exists($email);
        }
}
