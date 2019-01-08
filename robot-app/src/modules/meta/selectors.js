import { createSelector } from 'reselect';

import { getMetaSelector } from '../selectors';

const getBaseApiUrl = createSelector(
  getMetaSelector,
  ({ baseApiUrl }) => baseApiUrl,
);

module.exports = {
  getBaseApiUrl,
};
