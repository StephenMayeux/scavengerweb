import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    const { firstname, lastname } = props.user;
    this.state = {
      firstname,
      lastname
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.editUser(this.props.user._id, this.state);
  }

  render() {
    const style = { borderWidth: 2, borderColor: 'black', borderStyle: 'dashed', borderRadius: 4, padding: 30, width: 200, height: 200 };
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <form className="form-horizontal" onSubmit={this.handleFormSubmit.bind(this)}>
              <legend>Profile Information</legend>
              <div className="form-group">
                <label className="col-sm-3">First Name</label>
                <div className="col-sm-7">
                  <input name="firstname" className="form-control" value={this.state.firstname} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Last Name</label>
                <div className="col-sm-7">
                  <input name="lastname" className="form-control" value={this.state.lastname} onChange={this.handleChange.bind(this)}/>
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
