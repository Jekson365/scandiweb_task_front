<?php

namespace Core\Models;

use Core\Model;
use PDO;

class Attribute extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getByProductId($productId)
    {
        $sql = "SELECT * FROM attributes WHERE attributes.product_id = :product_id";
        $query = $this->db->prepare($sql);
        $query->bindParam(':product_id', $productId);
        $query->execute();

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}
