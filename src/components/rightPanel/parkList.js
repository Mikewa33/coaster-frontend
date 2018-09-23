import React from 'react';
import { Component } from 'react';

require('../../../styles/rightPanel.scss');

class ParkList extends Component {
    handleClick = () => {
        this.props.selectPark(this.props.value);
    }

    render() {
        return (
            <div className="park-tab"  onClick={this.handleClick}>
                {this.props.park.name}
                {this.props.park.location}
            </div>
        );
    }
}

export default ParkList;