import React, { Component } from 'react';
import { Link } from 'react-router';
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
          <div className="col-sm-4" key={profile._id}>
            <div className="panel">
              <div className="panel-body">
                <h3><Link to={`/profiles/${profile._id}`} >{profile.name}</Link></h3>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { profiles: state.profiles.allProfiles }
}

export default connect(mapStateToProps, actions)(Profiles);
