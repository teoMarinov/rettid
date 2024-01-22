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

    public function createNewUser() {
        $query = "INSERT INTO user (username, nickname, psw, email) VALUES 
        (:username, :nickname, :psw, :email)";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":nickname", $nickname);
        $stmt->bindParam(":psw", $psw);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
    } 
}