import React from 'react';
import { NavigatorIOS, YellowBox } from 'react-native';
import { Provider } from 'react-redux';

import Main from './src/components/Main';
import styles from './src/styles';
import { configureStore } from './src/modules/configure-store';

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

export default () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);
