import React from 'react';
import './ProductCartView.css';
import { connect } from 'react-redux';
import { setQuantityChanges, setAttributeChanges } from '../../../redux/slices/cartSlice';
import ProductCartHeader from './ProductCartHeader';
import ProductPrice from '../../product/ProductPrice/ProductPrice';
import ProductAttributes from '../ProductAttributes/ProductAttributes';
import ProductCartImages from '../ProductCartimages/ProductCartImages';
import ProductCartQuantity from './ProductCartQuantity';

class ProductCartView extends React.PureComponent {
  state = {
    componentStyle: this.props.componentStyle,
    quantity: this.props.product.quantity
  }

  handleCartDataQuantityChange = (quantity) => {
    this.props.setQuantityChanges([this.props.product, quantity]);
    this.props.triggerQuantityAndTotalUpdate();
  }

  renderAttributesList(attributes) {
    return (
      attributes.length > 0 && (
        <ul className={`product-cart-view-attributes-list ${this.state.componentStyle}`}>
          {attributes.map((attribute) => (
            <li className={`product-cart-view-attributes-list-item ${this.state.componentStyle}`} key={`${attribute.id} ${attribute.selected}`}>
              <ProductAttributes
                componentStyle={this.state.componentStyle}
                attribute={attribute}
              />
            </li>
          ))}
        </ul>
      )
    );
  }

  renderTopLine() {
    return (
      <div
        className="product-cart-view-topLine"
        style={{ display: this.state.componentStyle === 'large' ? 'block' : 'none' }}
      />
    );
  }

  renderPrice() {
    const { product: { prices, quantity } } = this.props;
    return (
      <div className={`product-cart-view-price ${this.state.componentStyle}`}>
        <ProductPrice
          componentStyle={this.state.componentStyle}
          prices={prices}
          quantity={quantity}
        />
      </div>
    );
  }

  render() {
    const { product: { name, brand, attributes, images, quantity } } = this.props;

    return (
      <div className={`product-cart-view-container ${this.state.componentStyle}`}>
        {this.renderTopLine()}
        <div className={`product-cart ${this.state.componentStyle}`}>
          <div className={`product-cart-view ${this.state.componentStyle}`}>
            <ProductCartHeader componentStyle={this.state.componentStyle} brand={brand} name={name} />
            {this.renderPrice()}
            <div>{this.renderAttributesList(attributes)}</div>
          </div>
          <div className={`product-cart-view-right ${this.state.componentStyle}`}>
            <ProductCartQuantity
              componentStyle={this.state.componentStyle}
              quantity={quantity}
              onQuantityChange={this.handleCartDataQuantityChange}
            />
            <ProductCartImages componentStyle={this.props.componentStyle} images={images} />
          </div>
        </div>
        {this.renderTopLine()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.cart;
};

const mapDispatchToProps = { setQuantityChanges, setAttributeChanges };

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartView);