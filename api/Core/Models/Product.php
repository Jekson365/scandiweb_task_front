<?php

namespace Core\Models;

use Core\Model;
use PDO;

class Product extends Model
{
    public function __construct()
    {
        parent::__construct();
    }
    public function getAllByCategory($catName) 
    {
        $sql = "SELECT 
                    products.id as id, 
                    products.inStock as inStock, 
                    products.name as name, 
                    categories.name as catName, 
                    categories.id as catId, 
                    products.price_id as price_id, 
                    prices.amount as amount, 
                    currencies.symbol as symbol 
                FROM products 
                LEFT JOIN categories ON categories.id = products.category_id
                LEFT JOIN prices ON prices.id = products.price_id
                LEFT JOIN currencies ON currencies.id = prices.currency_id";
    
        if ($catName !== 'all') {
            $sql .= " WHERE categories.name = :cat_name";
        }
    
        $query = $this->db->prepare($sql);
        
        if ($catName !== 'all') {
            $query->bindParam(":cat_name", $catName);
        }
    
        $query->execute();
    
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($prodId)
    {
        $sql = "SELECT
            products.id as id,
            products.inStock as inStock,
            products.name as name,
        categories.name as catName,
            categories.id as catId,
            products.price_id as price_id,
            prices.amount as amount,
            currencies.symbol as symbol
            FROM products 
         
        LEFT JOIN categories ON categories.id = products.category_id
        LEFT JOIN prices ON prices.id = products.price_id
        LEFT JOIN currencies ON currencies.id = prices.currency_id
        WHERE products.id = :prod_id";

        $query = $this->db->prepare($sql);
        $query->bindParam(":prod_id", $prodId);
        $query->execute();

        return $query->fetch(PDO::FETCH_ASSOC);
    }
}
