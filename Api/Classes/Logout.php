<?php

class Logout extends DbConnect
{
    private $token;

    public function __construct($token)
    {
        $this->token = $token;
    }
    public function logoutUser()
    {
        $query = 'UPDATE users SET token = NULL WHERE token = :token';
        echo json_encode($this->token);
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(':token', $this->token);
        $stmt->execute();
        // echo json_encode(['status' => 0, 'message' => 'User signed out successfully']);
    }
}