<?php

class GetAllSubsNames extends DbConnect
{
    public function getAllSubsNames()
    {
        $query = "SELECT title FROM `subs`";
        $stmt = parent::connect()->prepare($query);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response = ['status' => 1, 'data' => $data];
        echo json_encode($response);
    }
}