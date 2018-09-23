import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

require('../../../styles/rightPanel.scss');

export default class CoasterDetail extends Component {
  render() {
    return (
      <div className="coaster-tab">
        <div className="back-tab">
            <FontAwesomeIcon icon={faChevronLeft} onClick={this.props.backArrow} />
        </div>
        {this.props.coaster.name}
      </div>
    );
  }
}