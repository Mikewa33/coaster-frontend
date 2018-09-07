import React from 'react';
import { Component } from 'react';

import Header from './header';
import Flash from './flash';

export default class App extends Component {
  render() {
    return (
      <div>
      	<Flash />
        <Header />
        <div className="container">
        {this.props.children}
        </div>
      </div>
    );
  }
}
