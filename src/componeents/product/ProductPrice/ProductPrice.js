import React from 'react';
import { connect } from 'react-redux';
import './ProductPrice.css';

class ProductPrice extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            price : {
                symbol : '',
                amount : 0
            }
        };
      }
    
    componentDidMount() {
        this.updatePrice(this.props.currency);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currency !== this.props.currency) {
            this.updatePrice(this.props.currency);
        }
    }

    updatePrice(currency) {
        const currentProductPrice = this.props.prices.find(price => price.currency.symbol === currency);
        if (currentProductPrice) {
            this.setState({
                price: {
                    symbol: currentProductPrice.currency.symbol,
                    amount: currentProductPrice.amount
                }
            });
        }
    }

    render() {
        const { quantity = 1 } = this.props;
        return (
            <div className={`product-price ${this.props.componentStyle}`}>
                {this.state.price.symbol}
                {(this.state.price.amount * quantity).toFixed(2)}
            </div>
        );
    }
}

const mapStateToProps = state => state.currency;

export default connect(mapStateToProps)(ProductPrice);
