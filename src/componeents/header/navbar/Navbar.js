import React from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import CurrencySwitch from '../currencySwitch/CurrencySwitch';

const GET_NAVBAR_CATEGORIES = gql`
    {
        categories {
        name
    }
  }
`;
class Navbar extends React.Component {
    
    render() {
        return(
            <div>
                <Query query={GET_NAVBAR_CATEGORIES}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        return(
                            <ul className="navbar-list">
                            {data.categories.map(({name}) => 
                            <li className="navbar-list-item" key={name}>
                            <NavLink
                            className="navbar-list-item-link" 
                            to={{
                                pathname:`/${name}`,
                                state: {title: name} 
                              }}
                            >{name.toUpperCase()}</NavLink></li>
                            )}
                            </ul>
                        )
                    }
                }}
            </Query>
           <img src={require("../../../assets/images/Home-logo.png")} alt="home-icon"/>
           <CurrencySwitch/>
            </div>
        )
    }
}

export default Navbar;
