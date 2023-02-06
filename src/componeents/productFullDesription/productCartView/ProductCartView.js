import React from 'react';
import './ProductCartView.css';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { setQuantityChanges, setAttributeChanges } from '../../../redux/slices/cartSlice';
import ProductPrice from '../../product/ProductPrice/ProductPrice';
import ProductAttributes from '../ProductAttributes/ProductAttributes';
import ProductCartImages from '../ProductCartimages/ProductCartImages';

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

class ProductCartView extends React.Component {
    state = {
        size: this.props.size,
        quantity: this.props.product.quantity
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('prevProps',prevProps)
        // console.log('prevState',prevState)
        // console.log('stat',this.state.quantity)
        // console.log(this.props.cartData.filter(item => JSON.stringify(item) === JSON.stringify(this.props.product) ))
    }

    handleChildAttributeData = (changedProperty, preChangedCartProduct) => {
        this.props.setAttributeChanges({changedProperty, preChangedCartProduct});
        this.props.triggerQuantityAndTotalUpdate();
    }

    handleCartDataQuantityIncrement = async () => {
        await this.setState({quantity: this.state.quantity += 1});
        await this.props.setQuantityChanges([this.props.product, this.state.quantity]);
        this.props.triggerQuantityAndTotalUpdate();
    }

    handleCartDataQuantityDecrement = async () => {
        await this.setState({quantity: this.state.quantity -= 1});
        await this.props.setQuantityChanges([this.props.product, this.state.quantity]);
        this.props.triggerQuantityAndTotalUpdate();
    }

    render() {
        const { id, quantity } = this.props.product;
        return(
            <Query query={GET_PRODUCT_BY_ID} variables={{id: id}}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        const { name, brand, prices, attributes, gallery } = data.product

                        return(
                            <div className={`product-cart-view-container ${this.state.size}`}>
                                <div className="product-cart-view-topLine"
                                    style={{display : this.state.size === 'large' ? 'block' : 'none'}}>
                                </div>
                                <div className={`product-cart ${this.state.size}`}>
                                    <div className={`product-cart-view ${this.state.size}`}>
                                        <div className={`product-cart-view-headings ${this.state.size}`} >
                                            <h1 className={`product-cart-view-headings-brand ${this.state.size}`}>{brand}</h1>
                                            <h2 className={`product-cart-view-headings-name ${this.state.size}`}>{name}</h2>
                                        </div>
                                        <div className={`product-cart-view-price ${this.state.size}`}>
                                            <ProductPrice 
                                            size={this.props.size}
                                            prices={prices} 
                                            quantity={quantity}/>
                                        </div>
                                        <div>
                                            {!attributes[0] ? '' :
                                            <ul className={`product-cart-view-attributes-list ${this.state.size}`}>
                                                {attributes.map((attribute, index) => 
                                                
                                                    <li className={`product-cart-view-attributes-list-item ${this.state.size}`} key={`${index} ${id}`}>
                                                        <ProductAttributes 
                                                        size={this.state.size}
                                                        attribute={attribute}  
                                                        cartData={this.props.product}
                                                        sendAttributeChoiceToParent={this.handleChildAttributeData}/>  
                                                    </li>
                                                )} 
                                            </ul>}
                                        </div>
                                    </div>
                                    <div className={`product-cart-view-right ${this.state.size}`}>
                                            <div className={`product-cart-view-right-quentity ${this.state.size}`}>
                                                <button className={`product-cart-view-right-quantity-button ${this.state.size}`}
                                                onClick={this.handleCartDataQuantityIncrement}>
                                                    {`+`}
                                                </button>
                                                    <div className={`product-cart-view-right-quantity-amount ${this.state.size}`}>
                                                        {this.state.quantity}
                                                    </div>
                                                <button className={`product-cart-view-right-quantity-button ${this.state.size}`}
                                                onClick={this.handleCartDataQuantityDecrement}>
                                                    {`-`}
                                                </button>
                                            </div>
                                            <ProductCartImages 
                                            size={this.props.size}
                                            images={gallery}/>
                                    </div>
                                </div>
                                <div className="product-cart-view-topLine"
                                    style={{display : this.state.size === 'large' ? 'block' : 'none'}}>
                                </div>
                            </div>
                        )
                    }
                }}
            </Query>
        )
    }
}

const mapStateToProps = state => {
    return state.cart
}

const mapDispatchToProps = { setQuantityChanges, setAttributeChanges }

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartView);
