import React from 'react';
import './ProductDescriptionPage.css';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductDetails from '../../componeents/productFullDesription/ProductDetails/ProductDetails';
import { updateCartSliceQuantityAndTotal } from '../../assets/functions';
import { setCart, setTotalQuantityAndTotal } from '../../redux/slices/cartSlice';

const GET_PRODUCT_BY_ID = gql`
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

class ProductDescriptionPage extends React.Component {

    handleData = async (data) => {
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
                                <ProductDetails
                                product = {JSON.parse(JSON.stringify(data.product))}
                                handleAddingCard={this.handleData}
                                componentStyle="large"
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
    return {
        cartSlice: state.cart,
        currencySlice: state.currency
    }
  }

const mapDispatchToProps = { setCart, setTotalQuantityAndTotal }

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptiontWithRouter);
