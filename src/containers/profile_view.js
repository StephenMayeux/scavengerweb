import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProfileView extends Component {
  render() {
    return (
      <h3>{this.props.params.id}</h3>
    );
  }
}

function mapStateToProps(state) {
  return { userProfile: state.profiles.profile }
}

export default connect(mapStateToProps, actions)(ProfileView);
