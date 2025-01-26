<?php

namespace Core\Graphql\Queries;

use Attribute;
use Core\Graphql\Types\ProductType;
use Core\Models\Product;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use PDO;

class ProductQuery extends ObjectType
{
    public function __construct()
    {
        parent::__construct(
            [
                'name' => 'Query',
                'fields' => [
                    'productsByCat' => [
                        'type' => Type::listOf(new ProductType()),
                        'args' => [
                            'id' => Type::ID(),
                            'catName' => Type::string(),
                        ],
                        'resolve' => function ($root, $args, $context) {
                            $model = new Product();
                            if (!empty($args['id'])) {
                                $product = $model->getById($args['id']);
                                return $product ? [$product] : null; // Return as an array for consistency
                            } elseif (!empty($args['catName'])) {
                                return $model->getAllByCategory($args['catName']);
                            } else {
                                throw new \Exception("You must provide either 'id' or 'catName' as an argument.");
                            }
                        }
                    ],
                ],
            ]
        );
    }
}
