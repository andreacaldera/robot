import { createSelector } from 'reselect';

const getRootSelector = (state) => state;

const getMetaSelector = createSelector(
  getRootSelector,
  ({ meta }) => meta,
);

const getFeetSelector = createSelector(
  getRootSelector,
  ({ feet }) => feet,
);

module.exports = {
  getRootSelector,
  getMetaSelector,
  getFeetSelector,
};
