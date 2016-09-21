import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProfileView extends Component {
  componentWillMount() {
    this.props.fetchOneProfile(this.props.params.id);
  }

  render() {
    if (!this.props.userProfile) {
      return <div>Loading...</div>
    } else {
      const { name, email, city } = this.props.userProfile.data;
      return (
        <div>
          <h3>{name}</h3>
          <p className="lead">{email}</p>
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return { userProfile: state.profiles.profile }
}

export default connect(mapStateToProps, actions)(ProfileView);
