import React from 'react';
import { NavigatorIOS, YellowBox } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import reducers from './src/reducers';
import Main from './src/Components/Main';
import styles from './src/styles';
import sagas from './src/modules/sagas';

import config from './config';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.',
  'Warning: Warning: componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.',
]);

const App = () => (
  <NavigatorIOS
    style={styles.container}
    initialRoute={{
      title: 'Abune Shiatzu',
      component: Main,
    }}
  />
);

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});

const middlewares = [sagaMiddleware, loggerMiddleware];

const store = createStore(
  reducers,
  { feet: {}, meta: { baseApiUrl: config.apiBaseUrl } }, // TODO initial store
  compose(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(sagas);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
