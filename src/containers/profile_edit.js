import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class ProfileEdit extends Component {

  render() {
    //const { handleSubmit, fields: { name, city, avatar }} = this.props
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <form className="form-horizontal">
              <legend>Profile Information</legend>
              <div className="form-group">
                <label className="col-sm-3">Name</label>
                <div className="col-sm-7">
                  <input name="name" className="form-control" autoFocus defaultValue={this.props.user.user.name}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Email</label>
                <div className="col-sm-7">
                  <input name="email" type="email" className="form-control" defaultValue={this.props.user.user.email}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">City</label>
                <div className="col-sm-7">
                  <input name="city" className="form-control" defaultValue={this.props.user.user.city}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Website</label>
                <div className="col-sm-7">
                  <input name="homepage" className="form-control" defaultValue={this.props.user.user.homepage}/>
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
  return { user: state.auth }
}

export default connect(mapStateToProps)(ProfileEdit);

// update fields
/*export default reduxForm({
  form: 'edit',
  fields : ['name', 'city', 'avatar']
}, null, actions)(ProfileEdit);*/
