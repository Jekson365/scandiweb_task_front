<?php

namespace Core\Graphql\Types;

use Core\Graphql\Types\Attributes\AttributeType;
use Core\Models\Attribute;
use Core\Models\Category;
use Core\Models\Gallery;
use Core\Models\Price;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use PDO;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'product',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'name' => Type::nonNull(Type::string()),
                'category' => [
                    'type' => new CategoryType(),
                    'resolve' => function ($product, $args) {
                        $model = new Category();
                        $id = $product['catId'];
                        $result = $model->getCategoryById($id);
                        return $result;
                    }
                ],
                'amount' => Type::nonNull(Type::int()),
                'inStock' => Type::nonNull(Type::boolean()),
                'price' => [
                    'type' => new PriceType(),
                    'resolve' => function ($product, $args, $context) {
                        $model = new Price();
                        $id = $product['price_id'];
                        $result = $model->getPriceId($id);
                        return $result;
                    }
                ],
                'gallery' => [
                    'type' => Type::listOf(Type::string()),
                    'resolve' => function ($product, $args, $context) {
                        $model = new Gallery();
                        $productId = $product['id'];
                        $result = $model->getGalleryImages($productId);
                        return $result;
                    }
                ],
                'attributes' => [
                    'type' => Type::listOf(new AttributeType()),
                    'resolve' => function ($root, $args, $context) {
                        $model = new Attribute();
                        return $model->getByProductId($root['id']);
                    }
                ]
            ]
        ]);
    }
}
