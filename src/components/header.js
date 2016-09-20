import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';

export default class Header extends Component {
  render() {
    const active = { borderBottomColor: '#3f51b5' };
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
            <IndexLink to="/" className="navbar-brand">Stephen's Project</IndexLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeStyle={active}>Home</IndexLink></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login" activeStyle={active}>Log in</Link></li>
              <li><Link to="/signup" activeStyle={active}>Sign up</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
