import React from 'react';
import './ProductCard.css';
import ProductPrice from '../product-price/ProductPrice';

class ProductCard extends React.Component {

    render () {
        return (
            <div className="product-container">
            {this.props.product.inStock || 
            <div className="not-inStock-layout">
                <h2>not in stock</h2>
            </div>}
                <ul className="product-container-list">
                    <li className="product-container-list-item">
                        <img width="354px" height="330px"
                        src={this.props.product.gallery[0]} 
                        alt="product"/>
                    </li>
                    <li className="product-container-list-item">
                        <div className="product-container-list-item-description">
                            <div className="product-container-list-item-description-name">
                                {this.props.product.name}
                            </div>
                            <div className="product-container-list-item-description-price"> 
                                <ProductPrice prices={this.props.product.prices}/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        )
    }
}

export default ProductCard;
