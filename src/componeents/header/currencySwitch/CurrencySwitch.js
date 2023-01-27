import React from 'react';
import './CurrencySwitch.css';
import { Link, NavLink } from 'react-router-dom';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

const GET_CURRENCIES = gql `
    {
            currencies {
            label
            symbol
            }
    }
`;

class CurrencySwitch extends React.Component {
    state = {
        currentCurrency : ''
    }

    componentDidUpdate () {
        console.log(this.state.currentCurrency)
    }
    
    render() {
        return(
            <Query query={GET_CURRENCIES}>
            {({data, loading, error}) => {
                if(loading) return null;
                if(error) return (`Error ${error.message}`);
                if(data) {
                    return(
                        <ul className="currencies-list">
                        {data.currencies.map(({label, symbol}) => 
                        <li className="currencies-list-item" key={label}
                        onClick={()=> this.setState({currentCurrency : symbol})}
                        >
                            <span>{symbol}</span>
                            <span>{label}</span>
                        </li>
                    )}
                        </ul>
                    )
                }
            }}
            </Query>
        )
    }
}

export default CurrencySwitch;
