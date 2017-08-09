import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import meta from './meta';
import face from './face';

import { NAMESPACE } from './constants';

const rootReducer = combineReducers({
  meta,
  face,
});

module.exports = combineReducers({ routing: routerReducer, [NAMESPACE]: rootReducer });
