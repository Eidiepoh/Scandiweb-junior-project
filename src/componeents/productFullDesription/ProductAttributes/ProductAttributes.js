import React from 'react';
import './ProductAttributes.css';

class ProductAttributes extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem : this.props.attribute.selected,
            changeStatus: this.props.attribute.selected ? true : false
        };
      }

    
    componentDidUpdate(prevProps) {
        const { attribute, reset } = this.props;
        const { selectedItem } = this.state;

        if (attribute.selected !== selectedItem) {
            this.setState({ selectedItem: attribute.selected });
        }

        if (reset !== prevProps.reset) {
            this.setState({ selectedItem: null });
        }
    }

    sendAttributeChoiceToParent =  (changedProperty) => {
        const reDeclaredAttributes = JSON.parse(JSON.stringify(this.props.attribute));
        reDeclaredAttributes.selected = changedProperty[1];
        this.setState({selectedItem: changedProperty[1]});
        this.props.sendAttributeChoiceToParent(reDeclaredAttributes);
    }

    renderColorOption = (attributeType, option) => {
        const { selectedItem } = this.state;
        const { componentStyle } = this.props;

        return(
            <li
                className={`color-attribute ${option.id === selectedItem ? 'color-highlighted' : ''}`}
                    key={option.id}
                    onClick={() => this.state.changeStatus ? null : this.sendAttributeChoiceToParent([attributeType, option.id])}>
                <div
                    className={`attribute-list-color ${componentStyle}`}
                    style={{
                        background: option.value,
                        border: option.id === 'White' ? 'solid 0.5px black' : '',
                    }}></div>
            </li>
        )
    }

    renderAttributeOption = (attributeType, option) => {
        const { selectedItem } = this.state;
        const { componentStyle } = this.props;

        return (
            <li
                className={`${option.id === selectedItem ? 'attribute-highlighted' : ''}`}
                key={option.id}
                onClick={() => this.state.changeStatus ? null : this.sendAttributeChoiceToParent([attributeType, option.id])}>
                <div className={`attribute-list-item ${componentStyle}`}>
                    {option.value}
                </div>
            </li>
        )
    }

    render() {
        const { name, items: attributeOptions, id: attributeType } = this.props.attribute;
        const { componentStyle } = this.props;

        return (
            <div className="attribute-container">
                <h2 className={`attribute-name ${componentStyle}`}>{name}:</h2>
                <ul className={`attribute-list ${componentStyle}`}>
                    {attributeOptions.map((option) => {
                        return attributeType === 'Color' 
                        ? this.renderColorOption(attributeType, option)
                        : this.renderAttributeOption(attributeType, option);
                    })}
                </ul>
            </div>
        );
        }
    }
export default ProductAttributes;
