import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import meta from './meta';
import feet from './feet';

import { NAMESPACE } from './constants';

const rootReducer = combineReducers({
  meta,
  feet,
});

module.exports = combineReducers({ routing: routerReducer, [NAMESPACE]: rootReducer });
