import React from 'react';
import './ProductAttributes.css';

class ProductAttributes extends React.PureComponent {
    state = {
        selectedItem : '',
    }

    componentDidMount() {
        this.setState({selectedItem: this.props.attribute.selected})
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

    render() {
        const { name, items: attributeOptions, id: attributeType } = this.props.attribute;
        const { selectedItem } = this.state;
        const { componentStyle } = this.props;

        return (
            <div className="attribute-container">
                <h2 className={`attribute-name ${componentStyle}`}>{name}:</h2>
                <ul className={`attribute-list ${componentStyle}`}>
                    {attributeOptions.map((option) => {
                        if (attributeType === 'Color') {
                            return (
                                <li
                                    className={`color-attribute ${
                                        option.id === selectedItem ? 'color-highlighted' : ''}`}
                                        key={option.id}
                                        onClick={() => this.sendAttributeChoiceToParent([attributeType, option.id])}>
                                    <div
                                        className={`attribute-list-color ${componentStyle}`}
                                        style={{
                                            background: option.value,
                                            border: option.id === 'White' ? 'solid 0.5px black' : '',
                                        }}></div>
                                </li>
                            );
                        } else {
                            return (
                                <li
                                    className={`${option.id === selectedItem ? 'attribute-highlighted' : ''}`}
                                    key={option.id}
                                    onClick={() => this.sendAttributeChoiceToParent([attributeType, option.id])}>
                                    <div className={`attribute-list-item ${componentStyle}`}>
                                        {option.value}
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        );
        }
    }
export default ProductAttributes;
