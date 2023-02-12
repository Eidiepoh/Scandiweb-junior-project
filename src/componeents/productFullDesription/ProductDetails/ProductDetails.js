import React from 'react';
import './ProductDetails.css';
import ProductPrice from '../../product/ProductPrice/ProductPrice';
import ProductAttributes from '../ProductAttributes/ProductAttributes';
import ProductImages from '../../product/ProductImages/ProductImages';
import DOMPurify from 'dompurify';

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          product: {
            brand: '',
            name: '',
            prices: '',
            id: '',
            attributes: [],
            quantity: 1,
            images: []
          },
          reset: false,
          componentStyle: this.props.componentStyle,
          attributeFillStatus: false
        };
      }

    handleChildAttributeData = async dataFromChild => {
        const indexInAttributes = this.props.product.attributes.findIndex(item => item.id === dataFromChild.id)
        const currentAttributesState = this.props.product.attributes;
        currentAttributesState[indexInAttributes] = dataFromChild;
        await    this.setState(prevState => ({attributesCount: this.state.attributesCount+=1, product: {...prevState.product, attributes: currentAttributesState}}));
        const attributesCount = this.state.product.attributes.filter(attr => attr.selected ? true : false).length;
        this.setState({attributeFillStatus: attributesCount === this.props.product.attributes.length ? true : false})
}

    handleAddingCard = async (brand, name, prices, id, images) => {
        await this.setState(prevState => ({
            product: {
                ...prevState.product, 
                brand: brand, 
                name: name, 
                prices: prices, 
                id: id,
                images: images}}));
        
        this.props.handleAddingCard(this.state.product);

        await  this.setState(prevState => ({
            product: {
                ...prevState.product,
                attributes: [],
            },
            reset : true,
            attributeFillStatus: false}))
            this.setState({reset: false})
    }
    
    render() {
        const {brand, name, attributes, prices, description, inStock, id, gallery} = this.props.product;
        return(
            <div className="product-details-container">
                <ProductImages images={gallery} id={id}/>
                <div className="product-details">
                    <div className="product-details-headings">
                        <h1 className={`product-details-headings-brand`}>{brand}</h1>
                        <h2 className={`product-details-headings-name`}>{name}</h2>
                    </div>
                    {!attributes[0] ? '' :
                        <ul className="product-details-attributes-list">
                        {attributes.map((attribute, index) => 
                            <li className="product-details-attributes-list-item" key={`${index} ${id}`}>
                                <ProductAttributes attribute={attribute} reset={this.state.reset} componentStyle={this.state.componentStyle}
                                sendAttributeChoiceToParent={this.handleChildAttributeData}/>  
                            </li>
                        )} 
                        </ul>}
                    <div className="product-details-price">
                        <ProductPrice prices={prices} componentStyle={this.state.componentStyle}/>
                    </div>
                    <button className="product-details-button-addCard"
                    disabled={!inStock || !this.state.attributeFillStatus}
                    onClick={() => this.handleAddingCard(name, brand, prices, id, gallery)}>
                        add to card 
                    </button>
                    <div className="product-details-description"
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} />
                </div>
            </div>
        )
    }
}

export default ProductDetails;
