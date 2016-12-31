import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profiles extends Component {
  render() {
    return (
      <div className="container">
        <h1>Home</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { profiles: state.profiles.allProfiles }
}

export default connect(mapStateToProps, actions)(Profiles);
