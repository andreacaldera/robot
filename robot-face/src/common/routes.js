import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
// import Home from './components/Home';
import About from './components/About';
import Face from './components/Face';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Face} />
    <Route path="about" component={About} />
    <Route path="face" component={Face} />
  </Route>
);

export default routes;
