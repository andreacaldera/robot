import React, { Component } from 'react';
import { connect } from 'react-redux';

import Steer from './Steer';
import Speed from './Speed';

class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h2>Control</h2>
        <div className="row">
          <div className="col">
            <Steer />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Speed />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Home);
