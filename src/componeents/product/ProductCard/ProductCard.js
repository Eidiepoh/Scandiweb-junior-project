import React from 'react';
import './ProductCard.css';
import ProductPrice from '../ProductPrice/ProductPrice';
import AddProductInstantly from '../AddProductInstantly/AddProductInstantly';

class ProductCard extends React.PureComponent {

  renderNotInStock = () => {
    return (
      <div className="not-inStock-layout">
        <h2>not in stock</h2>
      </div>
    );
  }

  renderProductImage = () => {
    const { product } = this.props;
    const [firstImage] = product.gallery;
    return (
      <li className="product-container-list-item">
        <img
          width="354px"
          height="330px"
          src={firstImage}
          alt="product"
        />
      </li>
    );
  }

  renderProductDescription = () => {
    const { product } = this.props;
    return (
      <li className="product-container-list-item">
        <div className="product-container-list-item-description">
          <div className="product-container-list-item-description-name">
            {product.name}
          </div>
          <div className="product-container-list-item-description-price">
            <ProductPrice prices={product.prices} />
          </div>
        </div>
      </li>
    );
  }

  renderAddToCart = () => {
    const { product } = this.props;
    return (
      <div className="product-card-insta-add">
        {product.inStock && <AddProductInstantly product={product} />}
      </div>
    );
  }

  render() {
    const { product } = this.props;
    return (
      <div className="product-container">
        {product.inStock ? null : this.renderNotInStock()}
        <ul className="product-container-list">
          {this.renderProductImage()}
          {this.renderProductDescription()}
        </ul>
        {this.renderAddToCart()}
      </div>
    );
  }
}

export default ProductCard;
