import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import './ProductCardList.css';
import { Link } from 'react-router-dom';

const GET_PRODUCT_BY_TYPE = gql`
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

class ProductCardList extends React.Component {

    render () {
        return (
            <Query query={GET_PRODUCT_BY_TYPE} variables={{category: {title: this.props.productType}}}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        return(
                           <div className="product-list-page-listing">
                                <h2 className="product-list-page-heading">{this.props.productType}</h2>
                                <ul className="product-card-list">
                                {data.category.products.map(item =>
                                <li key={item.id} >
                                    <Link to={`${data.category.name}/${item.id}`}>
                                        <ProductCard product={item}/>
                                    </Link>
                                </li>
                            ) 
                        }
                        </ul>
                           </div>
                        )
                    }
                }}
            </Query>
        )
    }
}

export default ProductCardList;
