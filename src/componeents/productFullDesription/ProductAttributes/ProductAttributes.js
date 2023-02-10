import React from 'react';
import './ProductAttributes.css';

class ProductAttributes extends React.Component {
    state = {
        selectedItem : this.props.attribute.selected,
        reset : this.props.reset,
        componentStyle : this.props.componentStyle
    }
    
    static getDerivedStateFromProps(props, state) {
        if(state.reset !== props.reset) {
            return {
                selectedItem: null
            }
        }
        return null
    }

    sendAttributeChoiceToParent = async (changedProperty) => {
        const reDeclaredAttributes = JSON.parse(JSON.stringify(this.props.attribute));
        reDeclaredAttributes.selected = changedProperty[1];
        this.setState({selectedItem: changedProperty[1]});
        this.props.sendAttributeChoiceToParent(reDeclaredAttributes);
    }

    render() {
        const { name, items: attributeOptions, id: attributeType} = this.props.attribute;
            return(
                <div className="attribute-container">
                    <h2 className={`attribute-name ${this.state.componentStyle}`}>
                        {name}:
                    </h2>
                    {/* {console.log('propsAttr',this.props.attribute)} */}
                    {/* {console.log('selectedAttr',this.state.selectedItem)} */}
                    <ul className={`attribute-list ${this.state.componentStyle}`}>
                    {attributeOptions.map(option => {
                        
                        if(attributeType === 'Color') {
                            return    <li
                            className={`color-attribute ${option.id === this.state.selectedItem ? 'color-highlighted' : ''}`}
                            key={option.id}
                            onClick={() => this.sendAttributeChoiceToParent([attributeType,option.id])}>
                              <div className={`attribute-list-color ${this.state.componentStyle}`}
                                    style={{background: option.value,
                                    border: option.id === "White" ? "solid 0.5px black" : ''}}>
                              </div>
                            </li> 
                        } else {
                            return <li
                            className={`${option.id === this.state.selectedItem ? 'attribute-highlighted' : ''}`}
                             key={option.id}
                             onClick={() => this.sendAttributeChoiceToParent([attributeType,option.id])}>
                             <div className = {`attribute-list-item ${this.state.componentStyle}`}>
                                 {option.value} 
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
