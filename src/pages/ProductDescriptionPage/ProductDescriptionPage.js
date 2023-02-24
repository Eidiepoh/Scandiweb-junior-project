import React from 'react';
import './ProductDescriptionPage.css';
import { GET_DETAILED_PRODUCT_BY_ID } from '../../assets/queries';
import { Query } from '@apollo/client/react/components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductDetails from '../../componeents/productFullDesription/ProductDetails/ProductDetails';
import { setCart, setTotalQuantityAndTotal } from '../../redux/slices/cartSlice';

class ProductDescriptionPage extends React.PureComponent {

    handleData = async (data) => {
        this.props.setCart(data);
    }

    render() {
        const { match } = this.props;
        return(
            <Query query={GET_DETAILED_PRODUCT_BY_ID} variables={{id: match.params.id}}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) {
                        console.log('Product Description', error.message)
                        this.props.history.push('/*');
                    }
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

const ProductDescriptionWithRouter = withRouter(ProductDescriptionPage);

const mapStateToProps = state => {
    return {
        cartSlice: state.cart,
        currencySlice: state.currency
    }
}

const mapDispatchToProps = { setCart, setTotalQuantityAndTotal }

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionWithRouter);