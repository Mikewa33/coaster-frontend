import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import * as actions from '../../actions/authActions';

class Confirmation extends Component {
  componentWillMount() {
    //TO-DO BUILD TEST THIS
  	if(this.props.location){
    	this.props.confirmationEmail(queryString.parse(this.props.location.search).token,() => {
        this.props.history.push('/feature');
      });
	  }
  }

  render() {
    return (<div className="confirmation">Email Confirmed! Please proceed to the the App</div>);
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Confirmation);
