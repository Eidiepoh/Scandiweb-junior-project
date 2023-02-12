import React from 'react';
import './ProductCart.css';
import { connect } from 'react-redux';
import { setTotalQuantityAndTotal } from '../../redux/slices/cartSlice';
import ProductCartView from '../productFullDesription/ProductCartView/ProductCartView';
import { updateCartSliceQuantityAndTotal } from '../../assets/functions';

class ProductCart extends React.Component {
    state = {
        componentStyle : this.props.componentStyle,
        quantity : '',
        total: ''
    }
    
    componentDidMount() {
        this.setQuantityAndTotalInSlice();
    }
    
    setQuantityAndTotalInSlice = async() => {
        const { quantity, total } = updateCartSliceQuantityAndTotal(this.props.cartSlice.cartData, this.props.currencySlice.currency)
        await     this.setState({quantity: quantity, total: total})
        this.props.setTotalQuantityAndTotal([this.state.quantity, this.state.total])
    }

    render() {
        return (
            <ul className={`cart-page-list ${this.state.componentStyle}`}>
                {this.props.cartSlice.cartData.map((product, index) => 
                <li className="cart-page-list-item" key={`${index} ${product.name}`}>
                    <ProductCartView 
                    product={product} 
                    componentStyle={this.state.componentStyle}
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
