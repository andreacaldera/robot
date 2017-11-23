import React from 'react';
import { connect } from 'react-redux';

const NotFound = () => (
  <div className="container-fluid">
    <p>Sorry, not found.</p>
  </div>
);

export default connect(null, null)(NotFound);
