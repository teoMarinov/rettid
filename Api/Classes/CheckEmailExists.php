<?php

class CheckEmailExists extends DbConnect
{
    private $email;

    public function __construct($email)
    {
        $this->email = $email;
    }

    public function checkForEmail()
    {
        $query = "SELECT email FROM `users` WHERE email = :email";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":email", $this->email);
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