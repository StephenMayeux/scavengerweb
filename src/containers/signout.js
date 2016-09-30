import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div>
        <div className="alert alert-success">
          <p>You have signed out. See you again!</p>
        </div>
        <h2>Ready for an upgrade?</h2>
        <p className="lead">Important sales conversion copy here!</p>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
