import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

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
            <div className="navbar">
                <Query query={GET_NAVBAR_CATEGORIES}>
                {({data, loading, error}) => {
                    if(loading) return null
                    if(error) return (`Error ${error.message}`)
                    if(data) {
                        return(
                            <ul className="navbar-list">
                            {data.categories.map(({name}) => 
                            <li className="navbar-list-item" key={name}>
                                <NavLink className="navbar-list-item-link" 
                                to={`/${name}`}>
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
