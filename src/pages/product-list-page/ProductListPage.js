import React from 'react';
import ProductCardList from '../../componeents/product/product-card-list/ProductCardList';
import { withRouter } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
const GET_NAVBAR_CATEGORIES = gql`
    {
        categories {
        name
    }
  }
`;
class ProductListPage extends React.Component {

    render () {
        const { match } = this.props;

        if(!match.params.category) {
            return(
                <Query query={GET_NAVBAR_CATEGORIES}>
                {({data, loading, error}) => {
                if(loading) return null
                if(error) return (`Error ${error.message}`)
                if(data) {
                return    <ProductCardList productType={data.categories[0].name}/>
                }
                }}
                </Query>
            )
        } else {
            return    <ProductCardList productType={match.params.category}/>
        }

    }
}


export default withRouter(ProductListPage);
