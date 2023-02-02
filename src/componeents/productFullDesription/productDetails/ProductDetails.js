import React from 'react';
import './ProductDetails.css';
import ProductPrice from '../../product/product-price/ProductPrice';
import ProductAttributes from '../productAttributes/ProductAttributes';
import ProductHeadings from '../productHeadings/ProductHeadings';

class ProductDetails extends React.Component {
    state = {
            brand: '',
            name : '',
            prices : '',
            id : '',
            attributes : {},
            quantity : 1,
            reset : false
    }

    handleChildAttributeData = dataFromChild => {
        const currentAttributesState = this.state.attributes;
        const attributeFromChild = Object.entries(dataFromChild);
        const [attributeId, attributeValue] = attributeFromChild[0];
        currentAttributesState[attributeId] = attributeValue;
        this.setState({product: {attributes: currentAttributesState}});
    }

    handleAddingCard = async (brand, name, prices, id) => {
        await this.setState({brand: brand, name: name, prices: prices, id: id});
        this.props.handleAddingCard(this.state);
       await  this.setState({
            brand: '',
            name : '',
            prices : '',
            id : '',
            attributes : {},
            reset : true})
            this.setState({reset: false})
    }
    
    render() {
        const {brand, name, attributes, prices, description, id} = this.props
        return(
            <div className="product-details">
                <div className="product-details-headings">
                    <ProductHeadings brand={brand} name={name}/>
                </div>
                {!attributes[0] ? '' :
                    <ul className="product-details-attributes-list">
                    {attributes.map((attribute, index) => 
                        <li className="product-details-attributes-list-item" key={`${index} ${id}`}>
                            <ProductAttributes attribute={attribute} reset={this.state.reset}
                            sendAttributeChoiceToParent={this.handleChildAttributeData}/>  
                        </li>
                    )} 
                    </ul>}
                <div className="product-details-price">
                    <ProductPrice prices={prices}/>
                </div>
                <button className="product-details-button-addCard"
                disabled={Object.keys(this.state.attributes).length !== this.props.attributes.length}
                onClick={() => this.handleAddingCard(name, brand, prices, id)}
                >add to card</button>
                <div className="product-details-description"
                dangerouslySetInnerHTML={{__html: description}} />
            </div>
        )
    }
}

export default ProductDetails;
