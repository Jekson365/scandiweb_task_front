<?php

use Core\App;
use Core\Data\Database;
use Core\Graphql\Mutations\CartMutation;
use Core\Graphql\Queries\ProductQuery;
use Core\Mutations\ProductMutation;
use GraphQL\GraphQL;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;

require './vendor/autoload.php';

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");

$schema = new Schema([
    'query' => new ProductQuery(),
    'mutation' => new CartMutation()
]);



try {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $query = $input['query'];
    $variableValues = isset($input['variables']) ? $input['variables'] : null;
    $context = Database::getConnection();

    $result = GraphQL::executeQuery($schema, $query, null, $context, $variableValues);
    $output = $result->toArray();
} catch (\Exception $e) {
    $output = [
        'error' => [
            'message' => $e->getMessage()
        ]
    ];
}

header('Content-Type: application/json');
echo json_encode($output);
