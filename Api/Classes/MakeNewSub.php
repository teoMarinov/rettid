<?php


class MakeNewSub extends DbConnect
{
    private $display_name;
    private $title;
    private $creator;
    private $followSub;
    private $setMod;

    public function __construct($display_name, $title, $creator)
    {
        $this->display_name = $display_name;
        $this->title = $title;
        $this->creator = $creator;
        $this->followSub = new FollowSub($title, $creator);
        $this->setMod = new SetSubMod($title, $creator);
    }

    private function titleExists()
    {
        $normalizedTitle = strtolower($this->title);
        $query = "SELECT title FROM `subs` WHERE title = :title";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":title", $normalizedTitle);
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
        $query = "INSERT INTO subs (display_name, title, sub_owner)
        VALUES (:display_name, :title, :sub_owner)";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":display_name", $this->display_name);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":sub_owner", $this->creator);
        if ($this->titleExists()) {
            $response = ['status' => 0, 'message' => "Sub with this name already exists"];
        } else {
            $stmt->execute();
            $this->followSub->followSub();
            $this->setMod->setSubMod();
            $response = ['status' => 1, 'message' => 'Sub created successfully!'];
        }
        echo json_encode($response);
    }
}