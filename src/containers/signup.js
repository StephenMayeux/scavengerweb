import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { name, email, password, passwordConfirm }} = this.props;

    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <legend>Create an account</legend>
              <div className="form-group">
                <label>Name</label>
                <input className="form-control" {...name} autoFocus placeholder="John Smith" />
                {name.touched && name.error && <div>{name.error}</div>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" {...email} placeholder="jsmith@example.com" />
                {email.touched && email.error && <div>{email.error}</div>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" {...password} />
                {password.touched && password.error && <div>{password.error}</div>}
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" {...passwordConfirm} />
                {passwordConfirm.touched && passwordConfirm.error && <div>{passwordConfirm.error}</div>}
              </div>
              <div className="form-group">
                <small className="text-muted">By signing up, you agree to the <Link to="/">Terms of Service</Link>.</small>
              </div>
              {this.renderAlert()}
              <button type="submit" className="btn btn-success">Create an account</button>
            </form>
          </div>
        </div>
        <p className="text-center">
          Already have an account? <Link to="/signin"><strong>Log in</strong></Link>
        </p>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  for (var field in formProps) {
    if (!formProps[field]) {
      errors[field] = `Please enter your ${field}`
    }
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['name', 'email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
