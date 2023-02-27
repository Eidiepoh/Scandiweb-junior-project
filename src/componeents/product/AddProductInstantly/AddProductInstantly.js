import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddProductInstantly.css';
import { GET_PRODUCT_BY_ID } from '../../../assets/queries';
import { Query } from '@apollo/client/react/components';
import { setCart } from '../../../redux/slices/cartSlice';

class AddProductInstantly extends Component {
  constructor(props) {
    super(props);
    this.addCartWithFirstAttributes = this.addCartWithFirstAttributes.bind(this);
  }

  addCartWithFirstAttributes(event, attributes) {
    event.preventDefault();
    const { product, setCart } = this.props;
    const instaCartData = {
      attributes: attributes || [],
      brand: product.brand,
      id: product.id,
      images: product.gallery,
      name: product.name,
      prices: product.prices,
      quantity: 1,
    };
    instaCartData.attributes.forEach((item) => {
      if (!item.selected) {
        item.selected = item.items[0].id;
      }
    });
    setCart(instaCartData);
  }

  render() {
    const { product } = this.props;
    const { id } = product;

    return (
      <Query query={GET_PRODUCT_BY_ID} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return null;
          if (error) return `Error ${error.message}`;
          if (data) {
            const attributesData = JSON.parse(JSON.stringify(data.product.attributes));
            return (
              <button
                className="add-insta-to-cart-button"
                onClick={(event) => this.addCartWithFirstAttributes(event, attributesData)}
              >
                <img src={require('../../../assets/images/add-cart-insta.svg').default} alt="" />
              </button>
            );
          }
        }}
      </Query>
    );
  }
}

const mapDispatchToProps = { setCart };

export default connect(null, mapDispatchToProps)(AddProductInstantly);
