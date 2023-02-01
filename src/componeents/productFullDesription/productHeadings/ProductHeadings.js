import React from 'react';
import './ProductHeadings.css';

class ProductHeadings extends React.Component {

    render() {
    const { name, brand, size="large" } = this.props
        return (
            <div className={`product-headings ${size}`}>
                <h1 className={`product-headings-brand ${size}`}>{brand}</h1>
                <h2 className={`product-headings-name ${size}`}>{name}</h2>
            </div>
        )
    }
}

export default ProductHeadings;
