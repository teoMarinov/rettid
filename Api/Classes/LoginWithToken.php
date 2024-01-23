<?php

class LoginWithToken extends DbConnect
{
    private $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    private function checkToken()
    {
        $query = "SELECT token FROM users WHERE token = :token";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":token", $this->token);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$result) {
            return false;
        }
        return true;
    }
    public function loginUserWithToken()
    {
        if ($this->checkToken()) {
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
            token = :token";
            $stmt = parent::connect()->prepare($query);
            $stmt->bindParam(":token", $this->token);
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            $response = ['status' => 1, 'data' => $data];
        } else {
            $response = ['status' => 0];
        }
        echo json_encode($response);
    }
}
