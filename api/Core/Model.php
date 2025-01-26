<?php

namespace Core;

use Core\Data\Database;

class Model
{
    public $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }
}
