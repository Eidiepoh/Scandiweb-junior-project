import React from 'react';
import './ProductListPage.css';
import ProductCardList from '../../componeents/product/product-card-list/ProductCardList';
import { withRouter } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

const GET_NAVBAR_CATEGORIES = gql`
    {
        categories {
            __typename @skip(if: true)
        name
    }
  }
`;

class ProductListPage extends React.Component {

    render () {
        const { match } = this.props;
        if(!match.params.name) {
            return(
                <Query query={GET_NAVBAR_CATEGORIES}>
                    {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        return (
                            <div className="product-list-page">
                                <ProductCardList productType={data.categories[0].name}/>
                            </div>
                        )
                    }}}
                </Query>
            )
        } else {
            return    <ProductCardList productType={match.params.name}/>
        }

    }
}

export default withRouter(ProductListPage);
