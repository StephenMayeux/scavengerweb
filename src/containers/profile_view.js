import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProfileView extends Component {
  componentWillMount() {
    this.props.clearProfile();
    this.props.fetchOneProfile(this.props.params.id);
  }

  renderProfile(infos) {
    return infos.map(info => {
      if (info) {
        return <p className="lead" key={info}>{info}</p>;
      }
    });
  }

  render() {
    if (!this.props.userProfile) {
      return <div>Loading Profile...</div>
    } else {
      const { name, email, city, homepage, avatar } = this.props.userProfile.data;
      return (
        <div className="col-sm-offset-2 col-sm-8">
          <div className="panel">
            <div className="panel-body">
               <legend>{name}</legend>
               <div className="row">
                 <div className="col-sm-3">
                   <img src={avatar} className="img-rounded img-responsive" />
                 </div>
                 <div className="col-sm-9">
                   {this.renderProfile([email, city, homepage])}
                 </div>
               </div>
            </div>
          </div>
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return { userProfile: state.profiles.profile }
}

export default connect(mapStateToProps, actions)(ProfileView);
