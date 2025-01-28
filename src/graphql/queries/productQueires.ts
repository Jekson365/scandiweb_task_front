import { gql } from "@apollo/client";

export const GET_PROD_BY_CAT = gql`
  query GetProdByCat($cat: String!, $id: ID) {
    productsByCat(catName: $cat, id: $id) {
      id
      name
      id_name
      inStock
      gallery 
      description
      category {
        name
      }
      gallery
      price {
        amount
        currency {
          id
          label
          symbol
        }
      }
      attributes {
        name
        id_name
        type
        items {
          id
          value
          display_value
          id_name
        }
      }
    }
  }
`;