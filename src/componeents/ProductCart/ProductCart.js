import React from 'react';
import './ProductCart.css';
import { connect } from 'react-redux';
import { setTotalQuantityAndTotal } from '../../redux/slices/cartSlice';
import ProductCartView from '../productFullDesription/ProductCartView/ProductCartView';
import { updateCartSliceQuantityAndTotal } from '../../assets/functions';

class ProductCart extends React.PureComponent {

    componentDidMount() {
        this.setQuantityAndTotalInSlice();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cartSlice.cartData !== this.props.cartSlice.cartData) {
            this.setQuantityAndTotalInSlice();
        }
    }

    setQuantityAndTotalInSlice = () => {
        const { quantity, total } = updateCartSliceQuantityAndTotal(this.props.cartSlice.cartData, this.props.currencySlice.currency)
        console.log(quantity, total)
        this.props.setTotalQuantityAndTotal([quantity, total]);
    }

    render() {
        const { componentStyle } = this.props;
        const { cartData } = this.props.cartSlice;

        return (
            <ul className={`cart-page-list ${componentStyle}`}>
                {cartData.map((product, index) => 
                <li className="cart-page-list-item" key={`${index} ${product.name}`}>
                    <ProductCartView 
                    product={product} 
                    componentStyle={componentStyle}
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

const mapDispatchToProps = dispatch => ({
    setTotalQuantityAndTotal: (quantityAndTotal) => dispatch(setTotalQuantityAndTotal(quantityAndTotal))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);
