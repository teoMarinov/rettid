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
        if ($path[3] === 'users' && $path[4] === 'login') {
            require_once "./includes/login.inc.php";
            $data = json_decode(file_get_contents("php://input"), 1);
            $username = $data["username"];
            $password = $data["password"];
            $token = $data["token"];
            login($username, $password, $token);
        }
        if ($path[3] === 'users' && $path[4] === 'tokenLogin') {
            require_once "./includes/loginWithToken.inc.php";
            $data = json_decode(file_get_contents("php://input"), 1);
            $token = $data;
            login_with_token($token);
        }
        if ($path[3] === "users" && $path[4] === "logout") {
            require_once "./includes/logout.inc.php";
            $data = json_decode(file_get_contents("php://input"), 1);
            $token = $data;
            logout($token);
        }
        if ($path[3] === "sub" && $path[4] === "create") {
            require_once "./includes/makeNewSub.inc.php";
            $data = json_decode(file_get_contents("php://input"), 1);
            $title = $data["title"];
            $creator = $data["creator"];
            make_new_sub($title, $creator);
        }
    case "GET":
        if ($path[3] === "sub" && $path[4] === 'list') {
            require_once "./includes/getAllSubsNames.inc.php";
             get_all_subs_names();

        }
        if ($path[3] === "sub" && $path[4] === 'getSub') {
            require_once "./includes/getSubInfo.inc.php";
            $title = explode(':', $path[5])[1];
            get_sub_info($title);
        }
}
