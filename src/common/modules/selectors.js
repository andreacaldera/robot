import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const getRootSelector = (state) => state[NAMESPACE];

const getMetaSelector = createSelector(
  getRootSelector,
  ({ meta }) => meta
);

const getFeetSelector = createSelector(
  getRootSelector,
  ({ feet }) => feet
);

module.exports = {
  getRootSelector,
  getMetaSelector,
  getFeetSelector,
};
