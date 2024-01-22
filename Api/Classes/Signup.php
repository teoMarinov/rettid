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
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":nickname", $this->nickname);
        $stmt->bindParam(":psw", $this->psw);
        $stmt->bindParam(":email", $this->email);
        try {
            $stmt->execute();
            $respose = ['status' => 1, 'message' => 'User created successfully!'];
        } catch (PDOException $e) {
            $respose = ['status' => 0, 'message' => 'Failed to create user!' . $e];
        }
        echo json_encode($respose);
    }
}