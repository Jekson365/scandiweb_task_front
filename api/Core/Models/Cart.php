<?php

namespace Core\Models;

use Core\Model;

class Cart extends Model
{
    public function __construct()
    {
        parent::__construct();
    }
    public function save($items)
    {
        $createdItems = [];
        foreach ($items as $item) {
            $sql = "INSERT INTO cart_items (product_id,attributes,amount) VALUES (:product_id,:attributes,:amount)";
            $query = $this->db->prepare($sql);
            $query->bindParam(":product_id", $item['product_id']);
            $query->bindParam(':attributes', $item['attributes']);
            $query->bindParam(':amount', $item['amount']);
            $query->execute();

            $createdItems[] = [
                'product_id' => $item['product_id'],
                'attributes' => $item['attributes'],
                'amount' => $item['amount'],
            ];
        }

        return $createdItems;
    }
}
