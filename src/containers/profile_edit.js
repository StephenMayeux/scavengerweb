import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class ProfileEdit extends Component {
  handleFormSubmit(formProps) {
    this.props.editUser(this.props.user.user._id, formProps);
  }

  render() {
    const { handleSubmit, fields: { name, email, city, homepage, avatar }} = this.props

    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <legend>Profile Information</legend>
              <div className="form-group">
                <label className="col-sm-3">Name</label>
                <div className="col-sm-7">
                  <input {...name} name="name" className="form-control" autoFocus defaultValue={this.props.user.user.name}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Email</label>
                <div className="col-sm-7">
                  <input {...email} name="email" type="email" className="form-control" defaultValue={this.props.user.user.email}/>
                  {email.touched && email.error && <div>{email.error}</div>}
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">City</label>
                <div className="col-sm-7">
                  <input {...city} name="city" className="form-control" defaultValue={this.props.user.user.city}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Website</label>
                <div className="col-sm-7">
                  <input {...homepage} name="homepage" className="form-control" defaultValue={this.props.user.user.homepage}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Profile Image</label>
                <div className="col-sm-4">
                  <img src="/" width="100" height="100" className="profile"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-4">
                  <button type="submit" className="btn btn-success">Update Profile</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'An email is required'
  }
  return errors;
}

function mapStateToProps(state) {
  return { user: state.auth }
}

export default reduxForm({
  form: 'edit',
  fields : ['name', 'email', 'city', 'homepage', 'avatar'],
  validate
}, mapStateToProps, actions)(ProfileEdit);
