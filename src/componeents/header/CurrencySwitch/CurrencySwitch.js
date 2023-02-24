import React from 'react';
import './CurrencySwitch.css';
import { GET_CURRENCIES } from '../../../assets/queries'
import { Query } from '@apollo/client/react/components';
import { setCurrency } from '../../../redux/slices/currencySlice';
import { connect } from 'react-redux';


class CurrencySwitch extends React.PureComponent {
    render() {
        return(
            <Query query={GET_CURRENCIES}>
            {({data, loading, error}) => {
                if(loading) return null;
                if(error) {
                    console.log('CurrencySwitch error', error.message);
                }
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
