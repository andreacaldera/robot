import React, { Component } from 'react';
import { connect } from 'react-redux';

import Steer from './Steer';
import Speed from './Speed';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        Welcome
        <Steer />
        <Speed />
      </div>
    );
  }
}

export default connect(null, null)(Home);
