import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import sagas from './sagas';
import config from '../../config';
import reducers from './reducers';

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
  });

  const middlewares = [sagaMiddleware, loggerMiddleware];

  const store = createStore(
    reducers,
    { feet: {}, meta: { baseApiUrl: config.apiBaseUrl } },
    compose(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(sagas);

  return store;
};
