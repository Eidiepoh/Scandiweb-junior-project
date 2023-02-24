import React from 'react';
import './CartPage.css';
import ProductCart from '../../componeents/ProductCart/ProductCart';
import { connect } from 'react-redux';

class CartPage extends React.PureComponent {
    
    renderPriceListItem(label, value) {
        const { currency } = this.props.currencySlice;

        return (
            <li className="product-cart-page-price-list-item">
                <div className="product-cart-page-price-list-item-left">
                    {label}
                </div>
                <div className="product-cart-page-price-list-item-right">
                    <span>{label === 'Quantity:' ? '' : currency}</span>
                    <span>{label === 'Quantity:' ? value : value.toFixed(2)}</span>
                </div>
            </li>
        );
    }

  render() {
    const { cartSlice } = this.props;

    return (
      <div className="product-cart-page">
        <h1 className="product-cart-page-heading">Cart</h1>
        <div className="product-cart-page-cart">
          <ProductCart componentStyle="large" />
        </div>
        <ul className="product-cart-page-price-list">
          {this.renderPriceListItem('Tax 21%:', cartSlice.total * 0.21)}
          {this.renderPriceListItem('Quantity:', cartSlice.quantity)}
          {this.renderPriceListItem('Total:', cartSlice.total)}
        </ul>
        <button className="product-cart-page-button-order">Order</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    cartSlice: state.cart, 
    currencySlice: state.currency
})

export default connect(mapStateToProps)(CartPage);
