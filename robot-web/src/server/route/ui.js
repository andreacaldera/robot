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
import logger from '../logger';

export default ({ config }) => {
  const router = express.Router();

  logger.info(`Using API ${config.api.baseUrl}`);

  function renderFullPage(content, store) {
    return `
      <!doctype html>
      <html>
        <head>
          <meta http-equiv="content-type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
          <link rel="stylesheet" href="https://unpkg.com/react-rangeslider/umd/rangeslider.min.css" />
          <link rel="stylesheet" type="text/css" href="/dist/robotFeet.css" />
        <title>Robot Feet - Acal Software Limited</title>
        </head>
        <body>
          <div id="app">${content}</div>
          <script>window.__initialState__ = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
          <script src="/dist/robotFeet.js"></script>
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
              baseApiUrl: config.api.baseUrl,
            },
            feet: {},
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
