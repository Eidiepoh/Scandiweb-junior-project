import React from 'react';
import './ProductCart.css';
import { connect } from 'react-redux';
import { setTotalQuantityAndTotal } from '../../redux/slices/cartSlice';
import ProductCartView from '../productFullDesription/ProductCartView/ProductCartView';
import { updateCartSliceQuantityAndTotal } from '../../assets/functions';

class ProductCart extends React.Component {
    state = {
        size : this.props.size,
        quantity : '',
        total: ''
    }
    
    componentDidMount() {
        this.setQuantityAndTotalInSlice();
    }
    
    componentDidUpdate(a,b) {
        // console.log(a)
        // console.log(b)
    }

    setQuantityAndTotalInSlice = async() => {
        const { quantity, total } = updateCartSliceQuantityAndTotal(this.props.cartSlice.cartData, this.props.currencySlice.currency)
        await     this.setState({quantity: quantity, total: total})
        this.props.setTotalQuantityAndTotal([this.state.quantity, this.state.total])
    }

    render() {
        return (
            <ul className={`cart-page-list ${this.state.size}`}>
                {this.props.cartSlice.cartData.map((product, index) => 
                <li className="cart-page-list-item" key={`${index} ${product.name}`}>
                    <ProductCartView 
                    product={product} 
                    size={this.state.size}
                    triggerQuantityAndTotalUpdate={this.setQuantityAndTotalInSlice}/>
                </li>)}
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    cartSlice: state.cart, 
    currencySlice: state.currency
})

const mapDispatchToProps = { setTotalQuantityAndTotal }

export default connect(mapStateToProps,mapDispatchToProps)(ProductCart);
