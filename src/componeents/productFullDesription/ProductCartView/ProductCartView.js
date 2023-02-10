import React from 'react';
import './ProductCartView.css';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { setQuantityChanges, setAttributeChanges } from '../../../redux/slices/cartSlice';
import ProductPrice from '../../product/ProductPrice/ProductPrice';
import ProductAttributes from '../ProductAttributes/ProductAttributes';
import ProductCartImages from '../ProductCartimages/ProductCartImages';


class ProductCartView extends React.Component {
    state = {
        componentStyle: this.props.componentStyle,
        quantity: this.props.product.quantity
    }

    handleChildAttributeData = async (changedProperty) => {
        const preChangedCartProduct = this.props.product
        await   this.props.setAttributeChanges({changedProperty, preChangedCartProduct});
    }

    handleCartDataQuantityIncrement = async (quantity) => {
        await this.setState({quantity: quantity += 1});
        await this.props.setQuantityChanges([this.props.product, this.state.quantity]);
    }

    handleCartDataQuantityDecrement = async (quantity) => {
        await this.setState({quantity: quantity -= 1});
        await this.props.setQuantityChanges([this.props.product, this.state.quantity]);
    }

    render() {
        const { name, brand, id, prices, attributes, images, quantity } = this.props.product
            return(
                <div className={`product-cart-view-container ${this.state.componentStyle}`}>
                    <div className="product-cart-view-topLine"
                        style={{display : this.state.componentStyle === 'large' ? 'block' : 'none'}}>
                    </div>
                    <div className={`product-cart ${this.state.componentStyle}`}>
                        <div className={`product-cart-view ${this.state.componentStyle}`}>
                            <div className={`product-cart-view-headings ${this.state.componentStyle}`} >
                                <h1 className={`product-cart-view-headings-brand ${this.state.componentStyle}`}>{brand}</h1>
                                <h2 className={`product-cart-view-headings-name ${this.state.componentStyle}`}>{name}</h2>
                            </div>
                            <div className={`product-cart-view-price ${this.state.componentStyle}`}>
                                <ProductPrice
                                componentStyle={this.state.componentStyle}
                                prices={prices}
                                quantity={quantity}/>
                            </div>
                            <div>
                                {!attributes[0] ? '' :
                                <ul className={`product-cart-view-attributes-list ${this.state.componentStyle}`}>
                                    {attributes.map((attribute, index) => 
                                        <li className={`product-cart-view-attributes-list-item ${this.state.componentStyle}`} key={`${index} ${id}`}>
                                            <ProductAttributes 
                                            componentStyle={this.state.componentStyle}
                                            attribute={attribute}  
                                            sendAttributeChoiceToParent={this.handleChildAttributeData}/>
                                        </li>
                                    )}
                                </ul>}
                            </div>
                        </div>
                        <div className={`product-cart-view-right ${this.state.componentStyle}`}>
                                <div className={`product-cart-view-right-quentity ${this.state.componentStyle}`}>
                                    <button className={`product-cart-view-right-quantity-button ${this.state.componentStyle}`}
                                    onClick={() => this.handleCartDataQuantityIncrement(quantity)}>
                                        {`+`}
                                    </button>
                                        <div className={`product-cart-view-right-quantity-amount ${this.state.componentStyle}`}>
                                            {quantity}
                                        </div>
                                    <button className={`product-cart-view-right-quantity-button ${this.state.componentStyle}`}
                                    onClick={() => this.handleCartDataQuantityDecrement (quantity)}>
                                        {`-`}
                                    </button>
                                </div>
                                <ProductCartImages 
                                componentStyle={this.props.componentStyle}
                                images={images}/>
                        </div>
                    </div>
                    <div className="product-cart-view-topLine"
                        style={{display : this.state.componentStyle === 'large' ? 'block' : 'none'}}>
                    </div>
                </div>
                        )
    }
}

const mapStateToProps = state => {
    return state.cart
}

const mapDispatchToProps = { setQuantityChanges, setAttributeChanges }

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartView);
