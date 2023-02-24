import React from 'react';
import './ProductCartView.css';

class ProductCartQuantity extends React.Component {
  handleQuantityIncrement = () => {
    const { quantity, onQuantityChange } = this.props;
    onQuantityChange(quantity + 1);
  };

  handleQuantityDecrement = () => {
    const { quantity, onQuantityChange } = this.props;
    onQuantityChange(quantity - 1);
  };

  render() {
    const { quantity, componentStyle } = this.props;

    return (
      <div className={`product-cart-view-right-quentity ${componentStyle}`}>
        <button
          className={`product-cart-view-right-quantity-button ${componentStyle}`}
          onClick={this.handleQuantityIncrement}
        >
          +
        </button>
        <div className={`product-cart-view-right-quantity-amount ${componentStyle}`}>
            {quantity}
        </div>
        <button
          className={`product-cart-view-right-quantity-button ${componentStyle}`}
          onClick={this.handleQuantityDecrement}
        >
          -
        </button>
      </div>
    );
  }
}

export default ProductCartQuantity;