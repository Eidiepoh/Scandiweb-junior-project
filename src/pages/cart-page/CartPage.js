import React from 'react';
import './CartPage.css';
import ProductCart from '../../componeents/productCart/ProductCart';
import { connect } from 'react-redux';

class CartPage extends React.Component {
    state = {
        quantity : '',
        total : ''
    }

    

    render() {
        return (
            <div className="product-cart-page">
                <h1 className="product-cart-page-heading">cart</h1>
                <div className="product-cart-page-cart">
                    <ProductCart size="large"/>
                </div>
                <ul className="product-cart-page-price-list">
                    <li className="product-cart-page-price-list-item">
                        <div className="product-cart-page-price-list-item-left">
                            Tax 21%:
                        </div>
                        <div className="product-cart-page-price-list-item-right">
                            <span>{this.props.currencySlice.currency}</span>
                            <span>{(this.props.cartSlice.total * 21/100).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className="product-cart-page-price-list-item">
                        <div className="product-cart-page-price-list-item-left">
                            Quantity:
                        </div>
                        <div className="product-cart-page-price-list-item-right">
                            <span>{this.props.cartSlice.quantity}</span>
                        </div>
                    </li>
                    <li className="product-cart-page-price-list-item">
                        <div className="product-cart-page-price-list-item-left">
                            Total: 
                        </div>
                        <div className="product-cart-page-price-list-item-right">
                        <span>{this.props.currencySlice.currency}</span>
                        <span>{this.props.cartSlice.total.toFixed(2)}</span>
                        </div>
                    </li>
                </ul>
                <button className="product-cart-page-button-order">
                    order
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cartSlice: state.cart, 
    currencySlice: state.currency
})

export default connect(mapStateToProps)(CartPage);
