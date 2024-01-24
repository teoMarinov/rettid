<?php

class MakeNewSub extends DbConnect
{
    private $title;
    private $creator;

    public function __construct($title, $creator)
    {
        $this->title = $title;
        $this->creator = $creator;
    }

    private function titleExists()
    {
        $query = "SELECT title FROM `subs` WHERE title = :title";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":title", $this->title);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            return true;
        } else {
            return false;
        }
    }

    public function createSub()
    {
        $query = "INSERT INTO subs (title, sub_owner)
        VALUES (:title, :sub_owner)";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":sub_owner", $this->creator);
        if($this->titleExists()) {
            $response = ['status' => 0, 'message' => "Sub with this name already exists"];
        } else {
            $stmt->execute();
            $response = ['status' => 1,'message' => 'Sub created successfully!'];
        }
        echo json_encode($response);

    }
}