import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const getRootSelector = (state) => state[NAMESPACE];

const getMetaSelector = createSelector(
  getRootSelector,
  ({ meta }) => meta
);

const getTimereSelector = createSelector(
  getRootSelector,
  ({ timer }) => timer
);

const getPoliticsSelector = createSelector(
  getRootSelector,
  ({ politics }) => politics
);

const getFaceSelector = createSelector(
  getRootSelector,
  ({ face }) => face
);

module.exports = {
  getRootSelector,
  getMetaSelector,
  getTimereSelector,
  getPoliticsSelector,
  getFaceSelector,
};
