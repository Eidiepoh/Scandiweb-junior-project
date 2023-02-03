import React from 'react';
import './CartPage.css';
import { connect } from 'react-redux';
import ProductCartView from '../../componeents/productFullDesription/productCartView/ProductCartView';

class CartPage extends React.Component {
    state = {
        size : 'large'
    }

    componentDidMount() {
        if(window.innerWidth <= 325) {
            this.setState({size: 'mini'})
        }
    }

    render() {
        console.log(this.props.cartData)
        return (
            <ul className={`cart-page-list ${this.state.size}`}>
                {this.props.cartData.map((product, index) => 
                <li className="cart-page-list-item" key={`${index} ${product.name}`}>
                    <ProductCartView product={product}/>
                </li>)}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return state.cart;
}

export default connect(mapStateToProps)(CartPage);
