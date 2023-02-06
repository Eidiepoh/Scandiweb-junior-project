import React from 'react';
import './ProductAttributes.css';

class ProductAttributes extends React.Component {
    state = {
        selectedItem : null,
        reset : this.props.reset,
        size : this.props.size
    }

    static getDerivedStateFromProps(props, state) {
        if(state.reset !== props.reset) {
            return {
                selectedItem: null
            }
        }
        return null
    }

    sendAttributeChoiceToParent = async (changedProperty, preChangedCartProduct) => {
        const changedProppertyValue = changedProperty[Object.keys(changedProperty)[0]]
        this.setState({selectedItem: changedProppertyValue});
        this.props.sendAttributeChoiceToParent(changedProperty, preChangedCartProduct);
    }

    render() {
        const { name, items, id} = this.props.attribute;
            return(
                <div className="attribute-container">
                    <h2 className={`attribute-name ${this.state.size}`}>
                        {name}:
                    </h2>
                    <ul className={`attribute-list ${this.state.size}`}>
                    {items.map(item => 
                     {  let tempValue;
                        if(this.props.cartData) {
                            tempValue = item.id ===this.props.cartData.attributes[id];
                            
                        }
                        if(id === 'Color'){
                            return    <li
                            className={`color-attribute ${item.id === this.state.selectedItem ? 'color-highlighted' : ''}
                            ${tempValue && this.state.selectedItem === null ? 'color-highlighted' : ''}`}
                            key={item.id}
                            onClick={() => this.sendAttributeChoiceToParent({[id] : item.id}, this.props.cartData)}>
                              <div className={`attribute-list-color ${this.state.size}`}
                                    style={{background: item.value,
                                    border: item.id === "White" ? "solid 0.5px black" : ''}}>
                              </div>
                            </li> 
                        }else {
                            return <li
                            className={`${item.id === this.state.selectedItem ? 'attribute-highlighted' : ' '}
                            ${tempValue && this.state.selectedItem === null ? 'attribute-highlighted' : ''}`}
                             key={item.id}
                             onClick={() => this.sendAttributeChoiceToParent({[id] : item.id}, this.props.cartData)}>
                             <div className = {`attribute-list-item ${this.state.size}`}>
                                 {item.value}
                             </div>
                             </li> 
                        }
                      }
                    )}
                    </ul>
                </div>
            )
        }
    }
export default ProductAttributes;
