import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import * as actions from '../actions';

const CLOUDINARY_PRESET = 'caemikql';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/sandboxauth/upload';
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    const { name, email, city, homepage, avatar } = props.user;
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

  handleFormSubmit(event) {
    event.preventDefault();
    console.log('about to dispatch action', this.state);
    this.props.editUser(this.props.user._id, this.state);
  }

  onDrop(file) {
    this.handleImageUpload(file[0]);
  }

  handleImageUpload(image) {
    let upload = request.post(CLOUDINARY_URL)
                        .field('upload_preset', CLOUDINARY_PRESET)
                        .field('file', image);
    upload.end((err, response) => {
      if (err) {
        console.log(err);
      }
      if (response.body.secure_url) {
        this.setState({ avatar:  response.body.secure_url });
      }
    });
  }

  render() {
    console.log('i am rendering!');
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <form className="form-horizontal" onSubmit={this.handleFormSubmit.bind(this)}>
              <legend>Profile Information</legend>
              <div className="form-group">
                <label className="col-sm-3">Name</label>
                <div className="col-sm-7">
                  <input name="name" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Email</label>
                <div className="col-sm-7">
                  <input name="email" type="email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">City</label>
                <div className="col-sm-7">
                  <input name="city" className="form-control" value={this.state.city} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Website</label>
                <div className="col-sm-7">
                  <input name="homepage" className="form-control" value={this.state.homepage} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Profile Picture</label>
                <div className="col-sm-7">
                  <Dropzone onDrop={this.onDrop.bind(this)} multiple={false} accept="image/*" >
                    <div>Drag an image here, or click to select an image to upload.</div>
                  </Dropzone>
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
  return { user: state.profiles.user }
}

export default connect(mapStateToProps, actions)(ProfileEdit);
