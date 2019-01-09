import { createSelector } from 'reselect';

import { getMetaSelector } from '../selectors';

const getFeatureToggles = createSelector(
  getMetaSelector,
  ({ featureToggles }) => featureToggles
);

const getBaseApiUrl = createSelector(
  getMetaSelector,
  ({ baseApiUrl }) => baseApiUrl
);

module.exports = {
  getFeatureToggles,
  getBaseApiUrl,
};
