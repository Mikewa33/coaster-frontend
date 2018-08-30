import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

class Flash extends Component {


  render() {
    if(this.props.flashMsg){
      return (
        <div className="flash">{this.props.flashMsg}
        </div>
      );
    }else{
      return(<div className="flash"></div>);
    }
  }
}

function mapStateToProps(state) {
  return {
    flashMsg: state.flash.flashMsg
  };
}

export default connect(mapStateToProps, actions)(Flash);
