import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Dropzone from 'react-dropzone';

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

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.editUser(this.props.user.user._id, this.state);
  }

  onDrop(file) {
    const image = file[0].preview;
    this.setState({ avatar: image }, () => {
      console.log(this.state.avatar);
    });
  }

  render() {
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
                <div className="col-sm-offset-3 col-sm-4">
                  <button type="submit" className="btn btn-success">Update Profile</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <form className="form-horizontal">
              <legend>Profile Picture</legend>
              <div className="row">
                <div className="col-sm-5">
                  <Dropzone onDrop={this.onDrop} multiple={false}>
                    <div>Drag an image here, or click to select an image to upload.</div>
                  </Dropzone>
                </div>
                <div className="col-sm-7">
                  {this.renderAvatar()}
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

export default connect(mapStateToProps, actions)(ProfileEdit);
