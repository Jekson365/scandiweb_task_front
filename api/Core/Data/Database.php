<?php

namespace Core\Data;
use PDO;

class Database
{
    public static function getConnection(): PDO
    {
        $dsn = "mysql:host=127.0.0.1;port=3307;dbname=train;charset=utf8";
        $pdo = new PDO($dsn, 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $pdo;
    }
}
