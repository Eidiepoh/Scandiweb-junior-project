import React from 'react';
import './ProductListPage.css';
import ProductCardList from '../../componeents/product/ProductCardList/ProductCardList';
import { withRouter } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { Redirect } from 'react-router-dom';

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
        console.log(!match.params.name)
        if(!match.params.name) {
           return(
            <Query query={GET_NAVBAR_CATEGORIES}>
            {({data, loading, error}) => {
                if(loading) return null
                if(error) return (`Error ${error.message}`)
                if(data) {
                return    <Redirect to={`/category/${data.categories[0].name}`}/>
                }
            }}
        </Query>
           )
        }
        if(match.params.name) {
            return(
                <ProductCardList productType={match.params.name}/>
            )
        } 
    }
}

export default withRouter(ProductListPage);
