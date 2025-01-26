<?php

namespace Core\Graphql\Types\Cart;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CartItemType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'User',
            'fields' => [
                'product_id' => Type::int(),
                'attributes' => Type::nonNull(Type::string()),
                'amount' => Type::nonNull(Type::int()),
            ]
        ]);
    }
}
