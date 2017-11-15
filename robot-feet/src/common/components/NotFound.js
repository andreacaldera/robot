import React from 'react';
import { connect } from 'react-redux';

const NotFound = () =>
  (<p>Sorry, not found.</p>);

export default connect(null, null)(NotFound);
