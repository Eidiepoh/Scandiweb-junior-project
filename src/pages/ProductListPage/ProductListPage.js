import React from 'react';
import './ProductListPage.css';
import ProductCardList from '../../componeents/product/ProductCardList/ProductCardList';
import { withRouter } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { GET_NAVBAR_CATEGORIES } from '../../assets/queries';
import { Redirect } from 'react-router-dom';

class ProductListPage extends React.PureComponent {
  renderProductCardList = () => {
    const { match } = this.props;
    return <ProductCardList productType={match.params.name} />;
  }

  renderRedirectToCategory = (data) => {
    const categoryName = data.categories[0].name;
    return <Redirect to={`/category/${categoryName}`} />;
  }

  render() {
    const { match } = this.props;

    if (match.params.name) {
      return this.renderProductCardList();
    } else {
      return (
        <Query query={GET_NAVBAR_CATEGORIES}>
          {({ data, loading, error }) => {
            if (loading) return null;
            if (error) return `Error ${error.message}`;
            if (data) {
              return this.renderRedirectToCategory(data);
            }
          }}
        </Query>
      );
    }
  }
}

export default withRouter(ProductListPage);