import React from 'react';
import './ProductCardList.css';
import ProductCard from '../ProductCard/ProductCard';
import { withRouter } from 'react-router-dom';
import { GET_PRODUCT_BY_TYPE } from '../../../assets/queries';
import { Query } from '@apollo/client/react/components';
import { Link } from 'react-router-dom';

class ProductCardList extends React.PureComponent {
    
  renderProductCard = (item, data) => (
    <li key={item.id}>
      <Link to={`${data.category.name}/${item.id}`}>
        <ProductCard product={item} />
      </Link>
    </li>
  );

  render() {
    const { productType } = this.props;
    return (
      <Query query={GET_PRODUCT_BY_TYPE} variables={{ category: { title: productType } }}>
        {({ data, loading, error }) => {
          if (loading) return null;
          if (error) {
            this.props.history.push('/*');
          }
          if (data) {
            return (
              <div className="product-list-page-listing">
                <h2 className="product-list-page-heading">{productType}</h2>
                <ul className="product-card-list">
                  {data.category.products.map((item) => this.renderProductCard(item, data))}
                </ul>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default React.memo(withRouter(ProductCardList));