<?php

class GetPosts extends DbConnect
{
    private $sub_title;
    private $get_limit;
    private $get_offset;
    public function __construct($sub_title, $get_limit, $get_offset)
    {
        $this->sub_title = $sub_title;
        $this->get_limit = $get_limit;
        $this->get_offset = $get_offset;
    }

    private function getCommentsCount($post_id)
    {
        $sql = "SELECT COUNT(*) as numResults FROM comments WHERE post_id = :post_id;";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(":post_id", $post_id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_COLUMN);
        return $data;
    }

    public function getPosts()
    {
        $sql = "SELECT * FROM posts WHERE sub_title = :sub_title LIMIT :get_limit OFFSET :get_offset";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(':sub_title', $this->sub_title);
        $stmt->bindParam(':get_limit', $this->get_limit, PDO::PARAM_INT);
        $stmt->bindParam(':get_offset', $this->get_offset, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as &$post) {
            $post['comments'] = $this->getCommentsCount($post['id']);
        }
        $response = $data;
        return $response;
    }
}