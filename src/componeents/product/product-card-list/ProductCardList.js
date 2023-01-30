import React from 'react';
import ProductCard from '../product-card/ProductCard';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import './ProductCardList.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


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
        const { match } = this.props;
        console.log('LIIIST',match)
        return (
            <Query query={GET_PRODUCT_BY_TYPE} variables={{category: {title: this.props.productType}}}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        return(
                            <ul className="product-card-list">
                            {data.category.products.map(item =>
                            
                                <li >
                                    <Link   key={item.id+1} to={`${match.url}/${item.id}`}>
                                    <ProductCard product={item}/>
                                    </Link>
                                </li>
                            
                            ) 
                        }
                        </ul>
                        )
                    }
                }}
            </Query>
        )
    }
}

export default withRouter(ProductCardList);
