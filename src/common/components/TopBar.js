import React, { Component } from 'react';
import autobind from 'react-autobind';

import Link from 'react-router-dom/Link';

export default class TopMenu extends Component {
  constructor(...args) {
    super(...args);
    autobind(this);
  }

  state = {
    isMenuOpen: false,
  }

  toggleMenu(e) {
    e.preventDefault();
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
        <button className="navbar-toggler navbar-toggler-right" type="button" onClick={this.toggleMenu}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-brand" to="/">Abunai Shiatsu</div>

        <div className={`collapse navbar-collapse ${this.state.isMenuOpen ? 'show' : 'collapse'}`}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Control</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
