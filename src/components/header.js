import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';

const active = { borderBottomColor: '#3f51b5' };

// TODO: figure out activeStyle shit
class Header extends Component {
  renderRightMenu() {
    if (this.props.authenticated) {
      return [
        <li key={1}><Link to="/edit" activeClassName="active">Edit Profile</Link></li>,
        <li key={2}><Link to="/signout">Sign out</Link></li>
      ];
    } else {
      return [
        <li key={3}><Link to="/signin" activeClassName="active">Sign in</Link></li>,
        <li key={4}><Link to="/signup" activeClassName="active">Sign up</Link></li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <IndexLink to="/" className="navbar-brand">ScavengerHunt</IndexLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.renderRightMenu()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);
