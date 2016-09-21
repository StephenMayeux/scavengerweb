import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profiles extends Component {
  componentWillMount() {
    this.props.fetchProfiles();
  }

  renderList() {
    if (this.props.profiles.data) {
      return this.props.profiles.data.map(profile => {
        return (
          <li key={profile._id}>
            {profile.name}
          </li>
        );
      });
    }
  }

  render() {
    return (
      <ul>
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { profiles: state.profiles.allProfiles }
}

export default connect(mapStateToProps, actions)(Profiles);
