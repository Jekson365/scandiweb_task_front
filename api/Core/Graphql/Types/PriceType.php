<?php

namespace Core\Graphql\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use PDO;

class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'price',
            'fields' => [
                'amount' => Type::nonNull(Type::string()),
                'currency' => [
                    'type' => new ObjectType([
                        'name' => 'currency',
                        'fields' => [
                            'id' => Type::nonNull(Type::int()),
                            'label' => Type::nonNull(Type::string()),
                            'symbol' => Type::nonNull(Type::string()),
                        ]
                    ]),
                    'resolve' => function ($price, $args, $context) {
                        $db = $context;
                        $currencyId = $price['currency_id'];
                        $stmt = $db->query("SELECT * FROM currencies WHERE id = {$currencyId}");
                        return $stmt->fetch(PDO::FETCH_ASSOC);
                    }
                ]
            ]
        ]);
    }
}
