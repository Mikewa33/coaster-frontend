import React from 'react';
import { Component } from 'react';

import Map from './map/map';
import RightPanel from './rightPanel/rightPanel';

export default class Main extends Component {
  render() {
    return (
      <div>
          <Map />
          <RightPanel />
      </div>
    );
  }
}