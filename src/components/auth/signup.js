import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import * as actions from '../../actions/authActions';

const renderInput = (field) => {
    return (
        <div>
            <label>{field.label}:</label>
            <input {...field.input} type={field.type} id={field.id}
                className="form-control" />
                {field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>}
        </div>
    );
}

class Signup extends Component {

  componentWillMount() {
    this.props.authClearErrorMsg();
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
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
    if(this.props.emailSent){
      return( <div className="sign-up">{this.props.emailSent}</div> )
    }else{
      return (
        <div className="sign-up">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
               <Field name="email" type="email" component={renderInput} id="email-input" label="Email" />
            </fieldset>
            <fieldset className="form-group" id="test1">
               <Field name="password" type="password" component={renderInput} id="password-input" label="Password" />
            </fieldset>
            <fieldset className="form-group">
               <Field name="passwordConfirm" type="password" component={renderInput} id="password-confirm-input" label="Password Confirm" />
            </fieldset>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sign up!</button>
          </form>
        </div>
      );
    }
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    emailSent: state.auth.emailSent
   };
}

Signup = reduxForm({ form: 'signup', validate })(Signup);
export default connect(mapStateToProps, actions)(Signup);
