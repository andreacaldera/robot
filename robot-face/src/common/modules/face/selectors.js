import { createSelector } from 'reselect';

import { getFaceSelector } from '../selectors';

const getWebRtc = createSelector(
  getFaceSelector,
  ({ webrtc }) => webrtc
);

const isConnected = createSelector(
  getFaceSelector,
  ({ connected }) => connected
);

module.exports = {
  getWebRtc,
  isConnected,
};
