import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as actions from '../../actions/accountActions';

class Account extends Component {
    render(){
        return (<div>
            <Link to="/editemail" className="navbar-brand" id="email-change">Edit Email</Link>
            <Link to="/editpassword" className="navbar-brand" id="password-change">Edit Password</Link>
        </div>)
    }
}


export default Account;