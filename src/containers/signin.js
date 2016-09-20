import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Opps!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <legend>Log In</legend>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="jsmith@gmail.com" autoFocus className="form-control" {...email} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" {...password} />
              </div>
              {this.renderAlert()}
              <button type="submit" className="btn btn-success">Sign in</button>
            </form>
          </div>
        </div>
        <p className="text-center">
          Don't have an account? <Link to="/signup"><strong>Sign up</strong></Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
