import React from 'react';
import './ProductCartImages.css';

class ProductCartImages extends React.Component {
    state = {
        images: [],
        currentImageIndex : 0,
        size : this.props.size,
    }

    componentDidMount() {
        this.setState({images: this.props.images});
    }

    goToPrevImage = () => {
        this.setState(prevState => ({
            currentImageIndex: prevState.currentImageIndex > 0 ? prevState.currentImageIndex -1 : prevState.image.length -1
        }))
    }

    goToNextImage = () => {
        this.setState(prevState => ({
          currentImageIndex: prevState.currentImageIndex < prevState.images.length - 1 ? prevState.currentImageIndex + 1 : 0
        }));
      };

    render() {
        return(
            <div className={`product-card-images ${this.state.size}`}>
                <img className={`product-card-images-item ${this.state.size}`}
                src={this.state.images[this.state.currentImageIndex]} alt="current image"/>
                <div className={`product-card-images-arrows ${this.state.size}`}>
                    <button className={`product-card-images-arrows-arrow ${this.state.size}`}
                    onClick={this.goToPrevImage}>{'<'}</button>
                    <button className={`product-card-images-arrows-arrow ${this.state.size}`}
                    onClick={this.goToNextImage}>{'>'}</button>
                </div>
            </div>
        )
    }
}

export default ProductCartImages;
