import React from 'react';
import { render } from 'react-dom';
import createLogger from 'redux-logger';

import { Provider } from 'react-redux';
import Router from 'react-router-dom/Router';
import { renderRoutes } from 'react-router-config';

import history from './history';
import configureStore from '../common/store/configure-store';

import routes from '../common/routes';
import historyMiddleware from './history-middleware';

function preventScroll(e) {
  if (e.target.className === 'rangeslider__handle') {
    e.preventDefault();
  }
}

// document.addEventListener('touchstart', touchstart);
document.addEventListener('touchmove', preventScroll);

const store = configureStore(window.__initialState__, [createLogger, historyMiddleware]);

const AppRouter = () => (
  <Provider store={store}>
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  </Provider>
);

render(<AppRouter />, document.querySelector('#app'));
