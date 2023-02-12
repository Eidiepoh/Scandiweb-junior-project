import React from 'react';
import { connect } from 'react-redux';
import './ProductPrice.css';

class ProductPrice extends React.Component {
    state = {
        price : {
            symbol : '',
            amount : 0
        },
        componentStyle : this.props.componentStyle
    }
    
    componentDidMount() {
        const currentProductPrice = this.props.prices.filter(price => price.currency.symbol === this.props.currency)[0];
        this.setState({price : {symbol : this.props.currency, amount : currentProductPrice.amount}})
    }
    
    componentDidUpdate() {
        if(this.props.currency !== this.state.price.symbol) {
            const currentProductPrice = this.props.prices.filter(price => price.currency.symbol === this.props.currency)[0];
            this.setState({price : {symbol : currentProductPrice.currency.symbol ,amount : currentProductPrice.amount}})
        }
    }

    render() {
        const { quantity = 1 } = this.props
        return (
            <div className={`product-price ${this.state.componentStyle}`}> 
                {this.state.price.symbol}
                {(this.state.price.amount * quantity).toFixed(2)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.currency;
  }

export default connect(mapStateToProps)(ProductPrice);
