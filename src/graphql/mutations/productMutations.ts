import { gql } from "@apollo/client";

export const ADD_CART_ITEM = gql`
  mutation createCartItem($items: [CartItemInput!]!) {
    createCartItem(items: $items) {
      product_id
      amount
      attributes
    }
  }
`;
