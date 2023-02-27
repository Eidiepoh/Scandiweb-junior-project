import React from 'react';
import './Header.css'
import Navbar from './Navbar/Navbar';
import Currency from './Currency/Currency';
import CartHeader from './CartHeader/CartHeader';
import { Link } from 'react-router-dom';

class Header extends React.PureComponent {
    render() {
        return (
            <div className="header-fixed-container">
                <div className="header-container">
                    <Navbar/>
                    <div className="home-icon">
                    <Link to="/">
                            <img src={require('../../assets/images/homeIcon.svg').default} alt=""/>
                    </Link>
                    </div>

                    <div className="header-switches">
                        <Currency/>
                        <CartHeader/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header;
