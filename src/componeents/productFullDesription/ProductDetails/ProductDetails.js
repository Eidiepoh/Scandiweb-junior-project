import React from 'react';
import './ProductDetails.css';
import ProductPrice from '../../product/ProductPrice/ProductPrice';
import ProductAttributes from '../ProductAttributes/ProductAttributes';
import ProductImages from '../../product/ProductImages/ProductImages';
import ProductDetailsBottom from './ProductDetailsBottom';
import DOMPurify from 'dompurify';

class ProductDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        const { brand, name, attributes, prices, id } = props.product;
        this.state = {
            product: {
                brand,
                name,
                prices,
                id,
                attributes,
                quantity: 1,
                images: []
            },
            reset: false,
            componentStyle: props.componentStyle,
        };
    }

    handleChildAttributeData = async dataFromChild => {
        const indexInAttributes = this.props.product.attributes.findIndex(item => item.id === dataFromChild.id)
        const currentAttributesState = this.props.product.attributes;
        currentAttributesState[indexInAttributes] = dataFromChild;
        this.setState(prevState => ({product: {...prevState.product, attributes: currentAttributesState}}));
    }


    handleAddingCard =  (name, brand, prices, id, images) => {
        
        this.props.handleAddingCard({ 
                attributes: this.state.product.attributes,
                prices: this.state.product.prices,
                quantity: this.state.product.quantity,
                brand: brand, 
                name: name, 
                prices: prices, 
                id: id,
                images: images
        });

          this.setState(prevState => ({
            product: {
                ...prevState.product,
                attributes: [],
            },
            reset : true}))
            this.setState({reset: false})
    }
    
    render() {
        const { brand, name, attributes, inStock, id, gallery } = this.props.product;
        const { reset, componentStyle } = this.state;
        const isAttributesSelected = attributes.every(attribute => attribute.selected !== undefined && attribute.selected !== null);
        
        return (
            <div className="product-details-container">
                <ProductImages images={gallery} id={id}/>
                <div className="product-details">
                    <div className="product-details-headings">
                        <h1 className={`product-details-headings-brand`}>{brand}</h1>
                        <h2 className={`product-details-headings-name`}>{name}</h2>
                    </div>
                    {attributes.length > 0 && (
                    <ul className="product-details-attributes-list">
                        {attributes.map((attribute, index) => (
                        <li className="product-details-attributes-list-item" key={`${index} ${id}`}>
                            <ProductAttributes 
                                attribute={attribute} 
                                reset={reset} 
                                componentStyle={componentStyle}
                                sendAttributeChoiceToParent={this.handleChildAttributeData}/>
                        </li>
                        ))}
                    </ul>
                    )}
                    <ProductDetailsBottom 
                    componentStyle={componentStyle}
                    inStock={inStock}
                    isAttributesSelected={isAttributesSelected}
                    product={this.props.product}
                    triggerAddingCard={this.handleAddingCard}/>
                </div>
            </div>
        );
      }
}

export default ProductDetails;
