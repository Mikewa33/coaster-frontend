import React from 'react';
import { Component } from 'react';
import SearchList from './searchList'

require('../../../styles/rightPanel.scss');

export default class RightPanel extends Component {
  render() {
    return (
      <div className="right-panel">
        <SearchList />
      </div>
    );
  }
}