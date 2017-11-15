import React from 'react';
import { connect } from 'react-redux';

import Link from 'react-router-dom/Link';

const TopMenu = () => (
  <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="navbar-brand" to="/">Abunai Shiatsu</div>

    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
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

const mapStateToProps = (/* state */) => ({
});

TopMenu.propTypes = {
};


export default connect(mapStateToProps, null)(TopMenu);
