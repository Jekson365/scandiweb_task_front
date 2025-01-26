<?php

namespace Core\Graphql\Mutations;

use Core\Graphql\Types\Cart\CartItemType;
use Core\Models\Cart;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CartMutation extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'createCartItem' => [
                    'type' => Type::listOf(new CartItemType()),
                    'args' => [
                        'items' => Type::nonNull(Type::listOf(new InputObjectType([
                            'name' => 'CartItemInput',
                            'fields' => [
                                'product_id' => Type::nonNull(Type::int()),
                                'attributes' => Type::nonNull(Type::string()),
                                'amount' => Type::nonNull(Type::int()),
                            ]
                        ]))),
                    ],
                    'resolve' => function ($root, $args) {
                        $items = $args['items'];
                        $model = new Cart();
                        $result = $model->save($items);
                        
                        return $result;
                    }
                ],
            ],
        ]);
    }
}
