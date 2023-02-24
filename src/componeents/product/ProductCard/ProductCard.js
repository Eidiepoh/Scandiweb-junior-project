import React from 'react';
import './ProductCard.css';
import ProductPrice from '../ProductPrice/ProductPrice';
import AddProductInstantly from '../AddProductInstantly/AddProductInstantly';

class ProductCard extends React.PureComponent {
  render() {
    const { product } = this.props;
    const [firstImage] = product.gallery;

    return (
      <div className="product-container">
        {product.inStock || (
          <div className="not-inStock-layout">
            <h2>not in stock</h2>
          </div>
        )}
        <ul className="product-container-list">
          <li className="product-container-list-item">
            <img
              width="354px"
              height="330px"
              src={firstImage}
              alt="product"
            />
          </li>
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
        </ul>
        <div className="product-card-insta-add">
          {product.inStock && <AddProductInstantly product={product} />}
        </div>
      </div>
    );
  }
}

export default ProductCard;