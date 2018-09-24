import React from 'react';
import { Component } from 'react';

require('../../../styles/rightPanel.scss');

class CoasterList extends Component {
    handleClick = () => {
        this.props.selectCoaster(this.props.coaster);
    }

    render() {
        return (
            <div className="park-tab"  onClick={this.handleClick}>
                {this.props.coaster.name}
                {this.props.coaster.location}
            </div>
        );
    }
}

export default CoasterList;