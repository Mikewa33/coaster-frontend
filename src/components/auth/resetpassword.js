import React, { Component } from 'react';
import queryString from 'query-string';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
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

class Resetpassword extends Component {

  componentWillMount() {
    this.props.authClearErrorMsg();
  }

  handleFormSubmit(formProps) {
    this.props.resetPassword(formProps,queryString.parse(this.props.location.search).reset,() => {
      this.props.history.push('/signin');
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
      <div className="reset-password">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <Field name="password" type="password" id="password-input" component={renderInput} label="Password" />
          </fieldset>
          <fieldset className="form-group">
            <Field name="passwordConfirm" type="password" id="password-confirm-input" component={renderInput} label="Password Confirm" />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign up!</button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

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
  return { errorMessage: state.auth.error };
}

Resetpassword = reduxForm({ form: 'resetpassword', validate })(Resetpassword);
export default connect(mapStateToProps, actions)(Resetpassword);
