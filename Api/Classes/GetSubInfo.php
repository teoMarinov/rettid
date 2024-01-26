<?php

class GetSubInfo extends DbConnect
{
    private $title;

    private $getPosts;

    public function __construct($title)
    {
        $this->title = $title;
        $this->getPosts = new GetPosts($title, 20, 0);
    }

    private function getFollowers()
    {
        $sql = "SELECT followers.user_username as 'followers' FROM subs 
        JOIN followers ON subs.title = followers.sub_title 
        WHERE subs.title = :sub_title";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(':sub_title', $this->title);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_COLUMN);
        return $data;
    }
    private function getMods()
    {
        $sql = "SELECT mods.user_username as 'mods' FROM subs 
        JOIN mods ON subs.title = mods.sub_title 
        WHERE subs.title = :sub_title";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(':sub_title', $this->title);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_COLUMN);
        return $data;
    }
    private function getBans()
    {
        $sql = "SELECT bans.user_username as 'bans' FROM subs 
        JOIN bans ON subs.title = bans.sub_title 
        WHERE subs.title = :sub_title";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(':sub_title', $this->title);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_COLUMN);
        return $data;
    }
    public function getSubInfo()
    {
        $query = "SELECT * FROM `subs` WHERE title = :sub_title";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(':sub_title', $this->title);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $followers = $this->getFollowers();
        $mods = $this->getMods();
        $bans = $this->getBans();
        $posts = $this->getPosts->getPosts();
        $response = ['status' => 1, 'title' => $this->title, 'data' => ['sub' => $data, 'followers' => $followers, 'mods' => $mods, 'bans' => $bans, 'posts' => $posts]];
        echo json_encode($response);
    }
}