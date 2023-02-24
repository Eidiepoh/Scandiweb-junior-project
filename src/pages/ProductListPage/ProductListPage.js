import React from 'react';
import './ProductListPage.css';
import ProductCardList from '../../componeents/product/ProductCardList/ProductCardList';
import { withRouter } from 'react-router-dom';
import { GET_NAVBAR_CATEGORIES } from '../../assets/queries';
import { Query } from '@apollo/client/react/components';
import { Redirect } from 'react-router-dom';

class ProductListPage extends React.PureComponent {

    render () {
        const { match } = this.props;

        if(match.params.name) {
            return <ProductCardList productType={match.params.name}/>
        } else {
           return(
            <Query query={GET_NAVBAR_CATEGORIES}>
            {({data, loading, error}) => {
                if(loading) return null
                if(error) return (`Error ${error.message}`)
                if(data) {
                    const categoryName = data.categories[0].name;
                    return <Redirect to={`/category/${categoryName}`} />;
                }
            }}
            </Query>
           )
        }
    }
}

export default withRouter(ProductListPage);
