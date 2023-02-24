import React from 'react';
import ProductPrice from '../../product/ProductPrice/ProductPrice';
import DOMPurify from 'dompurify';

class ProductDetailsBottom extends React.PureComponent {
    triggerAddingCard = (name, brand, prices, id, gallery) => {
        this.props.triggerAddingCard(name, brand, prices, id, gallery)
    }
    render() {
        const { componentStyle, inStock, isAttributesSelected } = this.props;
        const { name, brand, prices, id, gallery, description } = this.props.product;

        return (
            <>
                <div className="product-details-price">
                    <ProductPrice prices={prices} componentStyle={componentStyle}/>
                </div>
                <button className="product-details-button-addCard"
                    disabled={!inStock || !isAttributesSelected}
                    onClick={() => this.triggerAddingCard(name, brand, prices, id, gallery)}>
                    add to cart
                </button>
                <div className="product-details-description"
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}/>
            </>
        )
    }
}

export default ProductDetailsBottom;
