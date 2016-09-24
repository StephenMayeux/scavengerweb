import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    const { name, email, city, homepage, avatar } = props.user.user;
    this.state = {
      name,
      email,
      city,
      homepage,
      avatar
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit(formProps) {
    console.log('these are form props', formProps);
    this.props.editUser(this.props.user.user._id, formProps);
  }

  render() {
    const { handleSubmit, initialValue, fields: { name, email, city, homepage, avatar }} = this.props
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <legend>Profile Information</legend>
              <div className="form-group">
                <label className="col-sm-3">Name</label>
                <div className="col-sm-7">
                  <input {...name} name="name" className="form-control" autoFocus value={this.state.name} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Email</label>
                <div className="col-sm-7">
                  <input {...email} name="email" type="email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">City</label>
                <div className="col-sm-7">
                  <input {...city} name="city" className="form-control" value={this.state.city} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Website</label>
                <div className="col-sm-7">
                  <input {...homepage} name="homepage" className="form-control" value={this.state.homepage} onChange={this.handleChange.bind(this)}/>
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

function mapStateToProps(state) {
  return { user: state.profiles }
}

export default reduxForm({
  form: 'edit',
  fields : ['name', 'email', 'city', 'homepage', 'avatar']
}, mapStateToProps, actions)(ProfileEdit);
