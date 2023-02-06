import React from 'react';
import './CurrencySwitch.css';
import { gql } from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { setCurrency } from '../../../redux/slices/currencySlice';
import { connect } from 'react-redux';

const GET_CURRENCIES = gql `
    {
            currencies {
            label
            symbol
            }
    }
`;

class CurrencySwitch extends React.Component {
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
                        onClick={() => this.props.setCurrency(symbol)}>
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

const mapDispatchToProps = { setCurrency }

export default connect(null, mapDispatchToProps)(CurrencySwitch);
