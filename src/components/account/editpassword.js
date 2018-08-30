import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/accountActions';

const renderInput = field => {
    return (
        <div>
            <input {...field.input} type={field.type} id={field.id} className="form-control"/>
        </div>
    );
}

class EditPassword extends Component {
    handleFormSubmit(formProps) {
        // Call action creator to sign up the user!
        this.props.updatePassword(formProps,() => {
            this.props.history.push('/account');
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

    render(){
        const { handleSubmit } = this.props;
        return (
        
        <div className="edit-password">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Current Password:</label>
                    <Field name="currentPassword" type="password" component={renderInput} id="current-password-input" label="Current Password"/>
                </fieldset>
                <fieldset className="form-group">
                    <label>New Password:</label>
                    <Field name="password" type="password" component={renderInput} id="new-password-input" label="New Password" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm New Password:</label>
                    <Field name="passwordConfirm" type="password" component={renderInput} id="confirm-password-input" label="Confirm Password" />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
        )
    }
}

function validate(formProps) {
    const errors = {};
    if(formProps.currentPassword){
        if (!formProps.password) {
            errors.password = 'Please enter a password';
        }
        
        if (!formProps.passwordConfirm) {
            errors.passwordConfirm = 'Please enter a password confirmation';
        }
        
        if (formProps.password !== formProps.passwordConfirm) {
            errors.password = 'Passwords must match';
        }
    }else {
        errors.currentPassword = "Please enter current password";
    }
    return errors;
}
    
function mapStateToProps(state) {
    return { 
        errorMessage: state.account.error 
    };
}
    
    
    
EditPassword = reduxForm({form: 'editpassword',  validate})(EditPassword);
export default connect(mapStateToProps, actions)(EditPassword);