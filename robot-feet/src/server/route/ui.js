import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import qs from 'qs';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import _ from 'lodash';

import configureStore from '../../common/store/configure-store';
import routes from '../../common/routes';
import { NAMESPACE } from '../../common/modules/constants';

export default ({ port }) => {
  const router = express.Router();

  function renderFullPage(content, store) {
    return `
      <!doctype html>
      <html>
        <head>
          <meta http-equiv="content-type" content="text/html; charset=utf-8" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
          <link rel="stylesheet" type="text/css" href="http://localhost:${port}/dist/robotFeet.css" />
        <title>Robot Feet - Acal Software Limited</title>
        </head>
        <body>
          <div id="app">${content}</div>
          <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
          <script>window.__initialState__ = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
          <script src="http://localhost:${port}/dist/robotFeet.js"></script>
        </body>
      </html>
      `;
  }

  function getActiveFeatureToggles(req) {
    const params = qs.parse(req.query);
    return params['feature-toggles'] !== undefined ? _.compact(params['feature-toggles']) : req.cookies.featureToggles || [];
  }

  router.get('/*', (req, res, next) => {
    const activeFeatureToggles = getActiveFeatureToggles(req);
    res.cookie('featureToggles', activeFeatureToggles);

    return Promise.resolve()
      .then(() => {
        const preloadedState = {
          [NAMESPACE]: {
            meta: {
              featureToggles: activeFeatureToggles,
            },
          },
        };
        // const memoryHistory = createMemoryHistory(req.url);
        const store = configureStore(preloadedState);
        // // const history = syncHistoryWithStore(memoryHistory, store);

        const context = { }; // TODO what is this?

        const content = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        );
        res.send(renderFullPage(content, store));
        // res.render('index', { title: 'Express', data: store.getState(), content });
      })
      .catch(next);
  });

  return router;
};
