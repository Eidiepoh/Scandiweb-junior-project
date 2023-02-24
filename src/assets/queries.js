import { gql } from 'graphql-tag';

export const GET_CURRENCIES = gql `
    {
            currencies {
            label
            symbol
            }
    }
`;

export const GET_PRODUCT_BY_ID = gql`
    query Product($id: String!) {
        product(id: $id) {
            __typename @skip(if: true)
            attributes {
                id
                name
                __typename @skip(if: true)
                items {
                    displayValue
                    value
                    id
                }
            }
        }
    }
`;

export const GET_DETAILED_PRODUCT_BY_ID = gql`
    query Product($id: String!) {
        product(id: $id) {
            id
            name
            inStock
            gallery
            description
            brand
            __typename @skip(if: true)
            prices {
                amount
                currency {
                label
                symbol
            }
            }
            attributes {
                id
                name
                __typename @skip(if: true)
                items {
                    displayValue
                    value
                    id
                }
            }
        }
    }
`;

export const GET_NAVBAR_CATEGORIES = gql`
    {
        categories {
        name
    }
  }
`;

export const GET_PRODUCT_BY_TYPE = gql`
    query getProducts($category : CategoryInput){
        category(input: $category){
            name
            products {
            name
            gallery
            id
            inStock
            prices {
                amount
                currency {
                label
                symbol
            }
            }
        } 
        }
    }
`;