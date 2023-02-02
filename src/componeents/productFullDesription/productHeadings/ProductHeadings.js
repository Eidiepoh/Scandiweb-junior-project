import React from 'react';
import './ProductHeadings.css';

class ProductHeadings extends React.Component {
    state = {
        size : 'large'
    }

    componentDidMount() {
        if(window.innerWidth <= 325) {
            this.setState({size : 'mini'})
        }
    }

    render() {
    const { name, brand } = this.props
        return (
            <div className={`product-headings ${this.state.size}`}>
                <h1 className={`product-headings-brand ${this.state.size}`}>{brand}</h1>
                <h2 className={`product-headings-name ${this.state.size}`}>{name}</h2>
            </div>
        )
    }
}

export default ProductHeadings;
