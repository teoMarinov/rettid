<?php

class Signup extends DbConnect
{
    private $username;
    private $nickname;
    private $psw;
    private $email;

    public function __construct($username, $nickname, $psw, $email)
    {
        $this->username = $username;
        $this->nickname = $nickname;
        $this->psw = $psw;
        $this->email = $email;
    }

    public function createNewUser()
    {
        $query = "INSERT INTO users (username, nickname, psw, email) VALUES 
        (:username, :nickname, :psw, :email)";
        $stmt = parent::connect()->prepare($query);
        $options = [
            'cost' => 12
        ];
        $hashedPwd = password_hash($this->psw, PASSWORD_BCRYPT, $options);
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":nickname", $this->nickname);
        $stmt->bindParam(":psw", $hashedPwd);
        $stmt->bindParam(":email", $this->email);
        try {
            $stmt->execute();
            $response = ['status' => 1, 'message' => 'User created successfully!'];
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => 'Failed to create user!' . $e];
        }
        echo json_encode($response);
    }
}
