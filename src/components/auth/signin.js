import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/authActions';

const renderInput = field => {
    return (
        <div>
            <input {...field.input} type={field.type} id={field.id} className="form-control"/>
        </div>
    );
}

class Signin extends Component {


  componentWillMount() {
    if(this.props.errorMessage){
      this.props.authClearErrorMsg();
    }
  }
  
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password },() => {
      this.props.history.push('/feature');
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="sign-in">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
             <Field name="email" type="email" id="email-input" component={renderInput} />
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <Field name="password" type="password" id="password-input" component={renderInput} />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
        <ul>
          <li className="nav-item" key="forgot">
            <Link id="forgot-password-link" className="nav-link" to="/forgotpassword">Forgot Password</Link>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
 form: 'signin'
})(Signin);
export default connect(mapStateToProps, actions)(Signin);