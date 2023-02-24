import React from 'react';
import './CartHeader.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCart from '../../ProductCart/ProductCart';

class CartHeader extends React.PureComponent {

      state = { showCart: false };
      cartRef = React.createRef();

      handleClickOutside = event => {
        if (this.cartRef.current && !this.cartRef.current.contains(event.target)) {
          this.setState({ showCart: false });
        }
      }

    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
          this.setState({ showCart: false });
        }
      }
    render() {
        return(
            <div>
                {this.state.showCart && <div className="mini-cart-background"></div>}
                 <div>
                    <div className="header-right-cart" onClick={() => this.setState({showCart: !this.state.showCart})}>
                            <img src={require("../../../assets/images/cartIcon.svg").default} alt=""/>
                            <div className="header-right-cart-quantity-icon">{this.props.cartSlice.quantity}</div>
                    </div>
                        {this.state.showCart && 
                        <div ref={this.cartRef} className="cart-products-listing">
                            <div className="cart-products-listing-heading">
                                <span>My Bag,</span>
                                <span>{` ${this.props.cartSlice.quantity} items`}</span>
                            </div>
                            <div className="product-cart-mini-container">
                                <ProductCart componentStyle="mini"/>
                            </div>
                            <div className="total-price-container">
                                <div className="total-price-container-total">
                                    total
                                </div>
                                <div className="total-price-container-price">
                                    {`${this.props.currencySlice.currency} ${this.props.cartSlice.total.toFixed(2)}`}
                                </div>
                            </div>
                            <div className="cart-header-buttons">
                                <Link to="/cart">
                                    <button className="cart-header-button view-bag">view bag</button>
                                </Link>
                                <button className="cart-header-button check-out">check out</button>
                            </div>
                        </div>}
                 </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cartSlice: state.cart, 
    currencySlice: state.currency
})

export default connect(mapStateToProps)(withRouter(CartHeader));
