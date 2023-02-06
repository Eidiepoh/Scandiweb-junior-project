import React from 'react';
import './ProductImages.css';

class ProductImages extends React.Component {
    state = {
        currentZoomedImage : ''
    }

    setZoomedImage(e) {
        this.setState({currentZoomedImage : e.target.currentSrc});
    }

    componentDidMount() {
        this.setState({currentZoomedImage : this.props.images[0]})
    }

    render() {
        return(
            <div className="product-description-images">
                <div className="product-description-images-list-container">
                <ul className="product-description-images-list">
                    {this.props.images.map((image, index) =>
                    <li className="product-description-images-list-item" 
                    key={`${this.props.id} ${index}`} 
                    onClick={(e) => this.setZoomedImage(e)}>
                        <img src={image} alt="product"/>
                    </li>
                    )}
                </ul>
                </div>
                <div className="product-description-images-main">
                    <img src={this.state.currentZoomedImage} alt="product"/>
                </div>
            </div>
        )
    }
}

export default ProductImages;
