import React from 'react';

class ProductCartHeader extends React.PureComponent {
    render() {
        const { componentStyle, brand, name } = this.props
        return (
            <div className={`product-cart-view-headings ${componentStyle}`} >
                <h1 className={`product-cart-view-headings-brand ${componentStyle}`}>{brand}</h1>
                <h2 className={`product-cart-view-headings-name ${componentStyle}`}>{name}</h2>
            </div>
        )
    }
}

export default ProductCartHeader;
