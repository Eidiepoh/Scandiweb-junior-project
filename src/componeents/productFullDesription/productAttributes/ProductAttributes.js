import React from 'react';
import './ProductAttributes.css';

class ProductAttributes extends React.Component {
    state = {
        attributeResults : '',
        selectedItem : null,
        reset : this.props.reset
    }

    static getDerivedStateFromProps(props, state) {
        if(state.reset !== props.reset) {
            return {
                selectedItem: null
            }
        }
        return null
    }

    sendAttributeChoiceToParent = async (e, id) => {
        await    this.setState({attributeResults: e});
        this.props.sendAttributeChoiceToParent(this.state.attributeResults);
        this.setState({ selectedItem: id });
    }

    render() {
        const { name, items, id, size='large'} = this.props.attribute;
        if(id === 'Color') {
            return (
                <div className="attribute-container">
                    <h2 className={`attribute-name ${size}`}>
                        {name}:
                    </h2>
                    <ul className={`attribute-list ${size}`}>
                    {items.map(item => 
                      <li className={`${item.id === this.state.selectedItem ? 'color-highlighted' : ''}`}
                      key={item.id}
                      onClick={() => this.sendAttributeChoiceToParent({[id] : item.id},item.id)}>
                        <div className={`attribute-list-color ${size}`}
                            style={{background: item.value}}>
                        </div>
                      </li>  
                    )}
                    </ul>
                </div>
            )
        } else {
            return(
                <div className="attribute-container">
                    <h2 className={`attribute-name ${size}`}>
                        {name}:
                    </h2>
                    <ul className={`attribute-list ${size}`}>
                    {items.map(item => 
                      <li className={`${item.id === this.state.selectedItem ? 'attribute-highlighted' : ''}`}
                      key={item.id}
                      onClick={() => this.sendAttributeChoiceToParent({[id] : item.id},item.id)}>
                      <div className = {`attribute-list-item ${size}`}>
                          {item.value}
                      </div>
                      </li>  
                    )}
                    </ul>
                </div>
            )
        }
    }
}

export default ProductAttributes;
