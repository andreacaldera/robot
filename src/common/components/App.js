import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderRoutes } from 'react-router-config';

import TopBarComponent from './TopBar';

const TopBar = React.createFactory(TopBarComponent);

const App = ({ route }) => {
  const mainContent = (
    <div>
      {renderRoutes(route.routes)}
    </div>
  );

  return (
    <div>
      {TopBar()}
      {mainContent}
    </div>
  );
};

App.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default connect(null, null)(App);
