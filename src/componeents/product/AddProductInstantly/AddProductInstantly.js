import React from 'react';
import './AddProductInstantly.css';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { setCart } from '../../../redux/slices/cartSlice';

const GET_PRODUCT_BY_ID = gql`
query Product($id: String!) {
    product(id: $id) {
        __typename @skip(if: true)
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
class AddProductInstantly extends React.Component {

    addCartWithFirstAttributes = (event, attributes) => {
        event.preventDefault()
        const instaCartData = {
            attributes: attributes, 
            brand: this.props.product.brand,
            id: this.props.product.id,
            images: this.props.product.gallery,
            name: this.props.product.name,
            prices: this.props.product.prices,
            quantity: 1
        }
        if(attributes) {
            instaCartData.attributes.map(item => 
                item.selected ? '' : item.selected = item.items[0].id)
        }
        console.log(instaCartData)
        this.props.setCart(instaCartData)
    }

    render() {
        const { id } = this.props.product
        return(
            <Query query={GET_PRODUCT_BY_ID} variables={{id}}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        const attributesData = JSON.parse(JSON.stringify(data.product.attributes))
                        return(
                            <button className="add-insta-to-cart-button"
                            onClick={(event) => this.addCartWithFirstAttributes(event, attributesData)}>
                                <img src={require('../../../assets/images/add-cart-insta.svg').default} alt=""/>
                            </button>
                        )
                    }
                }}
            </Query>
        )
    }
}

const mapDispatchToProps = { setCart }

export default connect(null, mapDispatchToProps)(AddProductInstantly);
