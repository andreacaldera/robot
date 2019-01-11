import { createSelector } from 'reselect';

import { getFeetSelector } from '../selectors';

export const getSpeed = createSelector(
  getFeetSelector,
  ({ speed }) => speed,
);

export const getSteer = createSelector(
  getFeetSelector,
  ({ steer }) => steer,
);

export const getMotorsData = createSelector(
  getFeetSelector,
  ({ motorsData }) => console.log('motors data', motorsData) || motorsData,
);

export const getError = createSelector(
  getFeetSelector,
  ({ error }) => error,
);
