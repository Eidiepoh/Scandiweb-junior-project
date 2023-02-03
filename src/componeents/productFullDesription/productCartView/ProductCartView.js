import React from 'react';
import './ProductCartView.css';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { setQuantityChanges, setAttributeChanges } from '../../../redux/slices/cartSlice';
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
        __typename @skip(if: true)
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
            __typename @skip(if: true)
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
        quantity: this.props.product.quantity
    }

    componentDidMount() {
        if(window.innerWidth <= 325) {
            this.setState({size: 'mini'})
        }
    }

    handleChildAttributeData = (changedProperty, preChangedCartProduct) => {
        this.props.setAttributeChanges({changedProperty, preChangedCartProduct});
    }

    handleCartDataQuantityIncrement = async () => {
        await this.setState({quantity: this.state.quantity += 1});
        console.log(this.props.product)
        this.props.setQuantityChanges([this.props.product, this.state.quantity]);
    }

    handleCartDataQuantityDecrement = async () => {
        await this.setState({quantity: this.state.quantity -= 1});
        this.props.setQuantityChanges([this.props.product, this.state.quantity]);
    }

    render() {
        const { id, quantity } = this.props.product;
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
                                            <ProductPrice prices={prices} quantity={quantity}/>
                                        </div>
                                        <div>
                                            {!attributes[0] ? '' :
                                            <ul className={`product-cart-view-attributes-list ${this.state.size}`}>
                                                {attributes.map((attribute, index) => 
                                                
                                                    <li className={`product-cart-view-attributes-list-item ${this.state.size}`} key={`${index} ${id}`}>
                                                        <ProductAttributes attribute={attribute}  cartData={this.props.product}
                                                        sendAttributeChoiceToParent={this.handleChildAttributeData}/>  
                                                    </li>
                                                )} 
                                            </ul>}
                                        </div>
                                    </div>
                                    <div className={`product-cart-view-right ${this.state.size}`}>
                                            <div className={`product-cart-view-right-quentity ${this.state.size}`}>
                                                <button className={`product-cart-view-right-quantity-button ${this.state.size}`}
                                                onClick={this.handleCartDataQuantityIncrement}>+</button>
                                                    <div className={`product-cart-view-right-quantity-amount ${this.state.size}`}>
                                                        {this.state.quantity}
                                                    </div>
                                                <button className={`product-cart-view-right-quantity-button ${this.state.size}`}
                                                onClick={this.handleCartDataQuantityDecrement}>-</button>
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

const mapDispatchToProps = { setQuantityChanges, setAttributeChanges }

export default connect(null,mapDispatchToProps)(ProductCartView);
