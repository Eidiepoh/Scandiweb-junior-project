import React from 'react';
import './ProductImages.css';

class ProductImages extends React.PureComponent {
    state = {
      currentZoomedImage: this.props.images[0],
    };
  
    setZoomedImage = (e) => {
      this.setState({ currentZoomedImage: e.target.currentSrc });
    };
  
    render() {
      const { images, id } = this.props;
      const { currentZoomedImage } = this.state;
  
      return (
        <div className="product-description-images">
          <div className="product-description-images-list-container">
            <ul className="product-description-images-list">
              {images.map((image, index) => (
                <li
                  className="product-description-images-list-item"
                  key={`${id}-${index}`}
                  onClick={this.setZoomedImage}>
                    <img src={image} alt="product" />
                </li>
              ))}
            </ul>
          </div>
  
          <div className="product-description-images-main">
            <img src={currentZoomedImage} alt="product" />
          </div>
        </div>
      );
    }
  }
  
export default ProductImages;
