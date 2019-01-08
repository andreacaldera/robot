import { combineReducers } from 'redux';
import feet from '../modules/feet/reducers';
import meta from '../modules/meta/reducers';

export default combineReducers({
  feet,
  meta,
});
