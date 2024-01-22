<?php

class CheckUsernameExists extends DbConnect
{
    private $username;

    public function __construct($username)
    {
        $this->username = $username;
    }

    public function checkForUsername()
    {
        $query = "SELECT username FROM `users` WHERE username = :username";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            $response = ['exists' => true];
        } else {
            $response = ['exists' => false];
        }
        echo json_encode($response);
    }
}