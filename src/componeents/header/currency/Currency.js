import React from 'react';
import './Currency.css';
import CurrencySwitch from '../currencySwitch/CurrencySwitch';

class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showList: false };
        this.listRef = React.createRef();
      }

      handleClickOutside = event => {
        if (this.listRef.current && !this.listRef.current.contains(event.target)) {
          this.setState({ showList: false });
        }
      }
    
      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }

    toggleList = () => {
        this.setState({showList : !this.state.showList})
    }
    
    render() {
        return(
            <div className="currency-container">
                <div className="currency" onClick={this.toggleList} ref={this.listRef}>
                    <span>{'$'}</span>
                    <span hidden={!this.state.showList}>
                        <img className='currency-arrow'
                        src={require("../../../assets/images/Arrow-down.png")} alt="up arrow"/>
                    </span>
                    <span hidden={this.state.showList}>
                        <img className='currency-arrow'
                        src={require("../../../assets/images/Arrow-up.png")} alt="up arrow"/>
                    </span>
                </div>
                
                {this.state.showList && 
                    <div  
                    className="header-currency-switch">
                        <CurrencySwitch/>
                    </div>
                }
            </div>
        )
    }
}

export default Currency;
