<?php

namespace Core\Graphql\Types\Attributes;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ItemType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Item',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'value' => Type::nonNull(Type::string()),
                'display_value' => Type::nonNull(Type::string()),
                'id_name' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}