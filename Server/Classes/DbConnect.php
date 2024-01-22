<?php

class DbConnect
{
    private $server = "localhost";
    private $port = ' 3308';
    private $dbname = "rettid_db";
    private $user = "root";
    private $pass = "";

    protected function connect()
    {
        try {
            $conn = new PDO("mysql:host=$this->server;port=$this->port;dbname=$this->dbname", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}