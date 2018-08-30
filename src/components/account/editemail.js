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

class EditEmail extends Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);
    }

    componentWillMount() {
        if(!this.props.email){
            this.props.getAccountInfo();
        }
    }

    handleFormSubmit(formProps) {
        // Call action creator to sign up the user!
        this.props.updateEmail(formProps,() => {
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
        
        <div className="edit-account">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" type="email" component={renderInput} id="email-input" label="Email"/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" type="password" component={renderInput} id="password-input" label="Password" />
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
    if (!formProps.email) {
      errors.email = 'Please enter an email';
    }
    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }
    return errors;
}

function mapStateToProps(state) {
    return { 
        email: state.account.email,
        initialValues: state.account,
        errorMessage: state.account.error 
    };
 }



EditEmail = reduxForm({form: 'editemail', enableReinitialize : true, validate})(EditEmail);
export default connect(mapStateToProps, actions)(EditEmail);