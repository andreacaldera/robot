import { combineReducers } from 'redux';

import { SET_WEBRTC, FACE_STARTED, REMOVE_VIDEO_REMOVED } from './constants';

const webrtc = (state = null, action) => {
  switch (action.type) {
    case SET_WEBRTC: return action.webrtc;
    default: return state;
  }
};

const connected = (state = false, action) => {
  switch (action.type) {
    case FACE_STARTED: return true;
    case REMOVE_VIDEO_REMOVED: return false;
    default: return state;
  }
};

module.exports = combineReducers({
  webrtc,
  connected,
});
