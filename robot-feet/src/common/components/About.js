import React from 'react';
import { connect } from 'react-redux';

const About = () =>
  (<div className="container-fluid">
    <h2>About</h2>
    <p>I am Abunai Shiatsu, nice to meet you!</p>
  </div>);

export default connect(null, null)(About);
