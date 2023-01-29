import React from 'react';
import './Header.css'
import homeIcone from '../../assets/images/homeIcone';
import Navbar from './navbar/Navbar';
import Currency from './currency/Currency';

class Header extends React.Component {
    render() {
        return (
            <div className="header-container">
                <Navbar/>
                <div className="home-icon">
                {homeIcone}
                </div>
                <Currency/>
            </div>
        )
    }

}

export default Header;
