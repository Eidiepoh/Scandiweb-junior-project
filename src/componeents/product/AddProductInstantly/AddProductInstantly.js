import React from 'react';
import { connect } from 'react-redux';
import './AddProductInstantly.css';
import { GET_PRODUCT_BY_ID } from '../../../assets/queries';
import { Query } from '@apollo/client/react/components';
import { setCart } from '../../../redux/slices/cartSlice';

const AddProductInstantly = ({ product, setCart }) => {
  const addCartWithFirstAttributes = (event, attributes) => {
    event.preventDefault();
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
  };

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
              onClick={(event) => addCartWithFirstAttributes(event, attributesData)}
            >
              <img src={require('../../../assets/images/add-cart-insta.svg').default} alt="" />
            </button>
          );
        }
      }}
    </Query>
  );
};

const mapDispatchToProps = { setCart };

export default connect(null, mapDispatchToProps)(AddProductInstantly);