<?php


namespace Core\Graphql\Types\Attributes;

use Core\Models\Item;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'attribute',
            'fields' => [
                'name' => Type::nonNull(Type::string()),
                'id_name' => Type::nonNull(Type::string()),
                'type' => Type::nonNull(Type::string()),
                'items' => [
                    'type' => Type::listOf(new ItemType()),
                    'resolve' => function ($attribute, $args, $context) {
                        $model = new Item();
                        $attrId = $attribute['id'];
                        $result = $model->getByAttrId($attrId);

                        return $result;
                    }
                ]
            ]
        ]);
    }
}
