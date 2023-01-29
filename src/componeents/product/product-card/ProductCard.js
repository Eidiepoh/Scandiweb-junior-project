import React from 'react';
import { connect } from 'react-redux';
import './ProductCard.css';

class ProductCard extends React.Component {

state = {
    price : {
        symbol : '',
        amount : 0
    }
}

componentDidMount() {
    const currentProductPrice = this.props.product.prices.filter(price => price.currency.symbol === this.props.currency)[0];
    this.setState({price : {symbol : this.props.currency, amount : currentProductPrice.amount}})
}

componentDidUpdate() {
    if(this.props.currency !== this.state.price.symbol) {
        const currentProductPrice = this.props.product.prices.filter(price => price.currency.symbol === this.props.currency)[0];
        this.setState({price : {symbol : currentProductPrice.currency.symbol ,amount : currentProductPrice.amount}})
    }
}

    render () {
        return (
            <div className="product-container">
            {this.props.product.inStock || 
            <div className="not-inStock-layout">
                <h2>not in stock</h2>
            </div>}
                <ul className="product-container-list">
                    <li className="product-container-list-item">
                        <img width="354px" height="330px"
                        src={this.props.product.gallery[0]} 
                        alt="product"/>
                    </li>
                    <li className="product-container-list-item">
                        <div className="product-container-list-item-description">
                            <div className="product-container-list-item-description-name">
                                {this.props.product.name}
                            </div>
                            <div className="product-container-list-item-description-price">                        
                                {this.state.price.symbol}
                                {this.state.price.amount}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.currency;
  }

export default connect(mapStateToProps)(ProductCard);
