import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/authActions';


const renderInput = field => {
    return (
        <div>
            <input {...field.input} id={field.id} type={field.type} className="form-control"/>
        </div>
    );
}

class Forgotpassword extends Component {
  handleFormSubmit({ email }) {
    this.props.forgotPassword({ email });
  }

  componentWillMount() {
    this.props.authClearErrorMsg();
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
      return ( <div className="forgot-password">{this.props.emailSent}</div>)
    }
    else{
      return (
        <div className="forgot-password">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
              <label>Email:</label>
              <Field name="email" type="email" id="email-input" component={renderInput} />
            </fieldset>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary forgot-password-button">Forgot Password</button>
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    emailSent: state.auth.emailSent
  };
}


Forgotpassword = reduxForm({
 form: 'forgotpassword'
})(Forgotpassword);
export default connect(mapStateToProps, actions)(Forgotpassword);
