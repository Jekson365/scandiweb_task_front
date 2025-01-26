<?php

namespace Core\Models;

use Core\Model;
use PDO;

class Item extends Model {
    public function getByAttrId($attrId) {
        $sql = "SELECT * FROM items WHERE attribute_id = :attributeId";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(":attributeId", $attrId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}