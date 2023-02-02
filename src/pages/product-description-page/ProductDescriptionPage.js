import React from 'react';
import './ProductDescriptionPage.css';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductImages from '../../componeents/productFullDesription/productImages/ProductImages';
import ProductDetails from '../../componeents/productFullDesription/productDetails/ProductDetails';
import { setCart } from '../../redux/slices/cartSlice';

const GET_PRODUCT_BY_ID = gql`
query Product($id: String!) {
    product(id: $id) {
        id
        name
        inStock
        gallery
        description
        category
        brand
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
            type
            items {
                displayValue
                value
                id
            }
        }
    }
  }
`;

class ProductDescriptionPage extends React.Component {

    handleData = (data) => {
        this.props.setCart(data);
    }

    render() {
        const { match } = this.props;
        return(
            <Query query={GET_PRODUCT_BY_ID} variables={{id: match.params.id}}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        return(
                            <div className="product-description-page">
                                <ProductImages 
                                images={data.product.gallery}
                                id={data.product.id}/>
                                
                                <ProductDetails 
                                brand={data.product.brand}
                                name={data.product.name}
                                attributes={data.product.attributes}
                                prices={data.product.prices}
                                description={data.product.description}
                                id={data.product.id}
                                handleAddingCard={this.handleData}
                                />
                            </div>
                        )
                    }
                }}
            </Query>
        )
    }
}

const ProductDescriptiontWithRouter = withRouter(ProductDescriptionPage);

const mapStateToProps = state => {
    return state.cart;
  }

const mapDispatchToProps = { setCart }

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptiontWithRouter);
