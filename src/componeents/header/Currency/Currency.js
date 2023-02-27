import React, { Component } from 'react';
import './Currency.css';
import { withRouter } from 'react-router-dom';
import CurrencySwitch from '../CurrencySwitch/CurrencySwitch';
import { connect } from 'react-redux';

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      showCart: false
    };
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

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ showList: false });
    }
  }

  toggleList = () => {
    this.setState({ showList: !this.state.showList })
  }

  render() {
    return (
      <div className="currency-container">
        <div className="header-right-currency" onClick={this.toggleList}>
          <div className="header-right-currency-icon">
            {this.props.currency}
          </div>
          <div>
            <span hidden={!this.state.showList}>
              <img className='currency-arrow'
                src={require("../../../assets/images/Arrow-down.svg").default} alt="down arrow" />
            </span>
            <span hidden={this.state.showList}>
              <img className='currency-arrow'
                src={require("../../../assets/images/Arrow-up.svg").default} alt="up arrow" />
            </span>
          </div>
        </div>
        {this.state.showList &&
          <div className="header-currency-switch"
            onClick={this.toggleList}
            ref={this.listRef}>
            <CurrencySwitch />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.currency;
}

export default connect(mapStateToProps)(withRouter(Currency));
