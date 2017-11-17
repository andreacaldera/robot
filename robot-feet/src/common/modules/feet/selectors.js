import { createSelector } from 'reselect';

import { getFeetSelector } from '../selectors';

const getSpeed = createSelector(
  getFeetSelector,
  ({ speed }) => speed
);

const getSteer = createSelector(
  getFeetSelector,
  ({ steer }) => steer
);

const getMotorsData = createSelector(
  getFeetSelector,
  ({ motorsData }) => motorsData
);


module.exports = {
  getSpeed,
  getSteer,
  getMotorsData,
};
