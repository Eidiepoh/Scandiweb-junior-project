import React from 'react';
import './ProductListPage.css';
import ProductCardList from '../../componeents/product/ProductCardList/ProductCardList';
import { withRouter } from 'react-router-dom';

class ProductListPage extends React.Component {

    render () {
        const { match } = this.props;
        if(match.params.name) {
            return(
                <ProductCardList productType={match.params.name}/>
            )
        }

    }
}

export default withRouter(ProductListPage);
