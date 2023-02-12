import React from 'react';
import './ErrorComponent.css';

class ErrorComponent extends React.Component {
    render() {
        return(
            <div className="error-component">
                <h1>This page doesn't exist</h1>
            </div>
        )
    }
}

export default ErrorComponent;
