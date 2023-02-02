import React from 'react';
import './ProductCartView.css';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import ProductHeadings from '../productHeadings/ProductHeadings';
import ProductPrice from '../../product/product-price/ProductPrice';
import ProductAttributes from '../productAttributes/ProductAttributes';
import ProductCartImages from '../productCartimages/ProductCartImages';

const GET_PRODUCT_BY_ID = gql`
query Product($id: String!) {
    product(id: $id) {
        id
        name
        inStock
        gallery
        description
        category
        brand
        prices {
            amount
            currency {
            label
             symbol
           }
         }
        attributes {
            id
            name
            type
            items {
                displayValue
                value
                id
            }
        }
    }
  }
`;

class ProductCartView extends React.Component {
    state = {
        size: 'large',
        quantity: 0
    }

    componentDidMount() {
        if(window.innerWidth <= 325) {
            this.setState({size: 'mini'})
        }
        this.setState({quantity: this.props.product.quantity})
    }

    handleChildAttributeData(data) {
        // console.log(data)
    }

    render() {
        const { id } = this.props.product;
        // console.log(this.props.product)
        return(
            <Query query={GET_PRODUCT_BY_ID} variables={{id: id}}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        const { name, brand, prices, attributes, gallery } = data.product
                        return(
                            <div>
                                <div className="product-cart-view-topLine"
                                    style={{display : this.state.size === 'large' ? 'block' : 'none'}}>
                                </div>
                                <div className="product-cart">
                                    <div className={`product-cart-view ${this.state.size}`}>
                                        <div className="product-cart-view-headings">
                                            <ProductHeadings brand={brand} name={name}/>
                                        </div>
                                        <div className={`product-cart-view-price ${this.state.size}`}>
                                            <ProductPrice prices={prices}/>
                                        </div>
                                        <div>
                                            {!attributes[0] ? '' :
                                            <ul className={`product-cart-view-attributes-list ${this.state.size}`}>
                                                {attributes.map((attribute, index) => 
                                                
                                                    <li className={`product-cart-view-attributes-list-item ${this.state.size}`} key={`${index} ${id}`}>
                                                        <ProductAttributes attribute={attribute} size='large' id={this.props.product}
                                                        sendAttributeChoiceToParent={this.handleChildAttributeData}/>  
                                                    </li>
                                                )} 
                                            </ul>}
                                        </div>
                                    </div>
                                    <div className={`product-cart-view-right ${this.state.size}`}>
                                            <div className={`product-cart-view-right-quentity ${this.state.size}`}>
                                                <button className={`product-cart-view-right-quantity-button ${this.state.size}`}
                                                onClick={() => this.setState({quantity: this.state.quantity+=1})}>+</button>
                                                    <div className={`product-cart-view-right-quantity-amount ${this.state.size}`}>
                                                        {this.state.quantity}
                                                    </div>
                                                <button className={`product-cart-view-right-quantity-button ${this.state.size}`}
                                                onClick={() => this.setState({quantity: this.state.quantity-=1})}>-</button>
                                            </div>
                                            <ProductCartImages images={gallery}/>
                                        </div>
                                </div>
                            </div>
                        )
                    }
                }}
            </Query>
        )
    }
}

export default ProductCartView;
