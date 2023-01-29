import React from 'react';
import { withRouter } from 'react-router-dom';

class ProductDescriptionPage extends React.Component {
    render() {
        const { match } = this.props;
        console.log(match.params);
        return(
            <div>testuy</div>
        )
    }
}

export default withRouter(ProductDescriptionPage);
