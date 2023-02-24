import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { GET_NAVBAR_CATEGORIES } from '../../../assets/queries';
import { Query } from '@apollo/client/react/components';



class Navbar extends React.PureComponent {

    render() {
        return(
            <div className="navbar">
                <Query query={GET_NAVBAR_CATEGORIES}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        return(
                            <ul className="navbar-list">
                            <NavLink to={`/cart`}>
                            </NavLink>
                            {data.categories.map(({name}) => 
                            <li className="navbar-list-item" key={name}>
                                <NavLink className="navbar-list-item-link" 
                                to={`/category/${name}`}>
                                    {name.toUpperCase()}
                                </NavLink>
                            </li>
                            )}
                            </ul>
                        )
                    }
                }}
            </Query>
            </div>
        )
    }
}


export default Navbar;
