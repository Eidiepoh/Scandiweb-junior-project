import React from 'react';
import ProductCard from '../product-card/ProductCard';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import './ProductCardList.css';

const GET_PRODUCT_BY_TYPE = gql`
query getProducts($category : CategoryInput){
    category(input: $category){
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

class ProductCardList extends React.Component {
    render () {
        return (
            <Query query={GET_PRODUCT_BY_TYPE} variables={{category: {title: this.props.productType}}}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        return(
                            <ul className="product-card-list">
                            {data.category.products.map(item =>
                            <li key={item.id}><ProductCard product={item}/></li>
                            )}
                        </ul>
                        )
                    }
                }}
            </Query>
        )
    }
}


export default ProductCardList;
