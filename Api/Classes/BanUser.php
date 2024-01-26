<?php

class BanUser extends DbConnect
{
    private $sub_title;
    private $user_username;
    public function __construct($sub_title, $user_username )
    {
        $this->sub_title = $sub_title;
        $this->user_username = $user_username;
    }

    public function banUser() {
        $query = "INSERT INTO bans (sub_title, user_username)
        VALUES (:sub_title, :user_username)";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":sub_title", $this->sub_title);
        $stmt->bindParam(":user_username", $this->user_username);
        $stmt->execute();
        $response = ['status' => 1,'message' => 'Sub followed successfully!'];
        echo json_encode($response);
    }

}