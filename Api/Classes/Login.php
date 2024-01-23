<?php

class Login extends DbConnect
{
    private $username;
    private $nickname;
    private $psw;
    private $email;

    public function __construct($username, $psw)
    {
        $this->username = $username;
        $this->psw = $psw;
    }

    private function checkPassword()
    {
        $query = "SELECT psw FROM users WHERE username = :username";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->execute();
        $userPsw = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$userPsw) {
            return false;
        }
        $isValidPassword = password_verify($this->psw, $userPsw['psw']);
        if ($isValidPassword) {
            return true;
        } else {
            return false;
        }
    }
    public function loginUser()
    {
        if ($this->checkPassword()) {
            $query = "SELECT 
            username, 
            nickname, 
            email, 
            post_karma, 
            comment_karma, 
            profile_pic, 
            created_at, 
            is_admin, 
            is_banned 
            FROM `users` WHERE 
            username = :username";
            $stmt = parent::connect()->prepare($query);
            $stmt->bindParam(":username", $this->username);
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            $response = ['status' => 1, 'data' => $data];
        } else {
            $response = ['status' => 0];
        }
        echo json_encode($response);
    }
}
