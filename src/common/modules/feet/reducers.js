import { combineReducers } from 'redux';

import { SET_MOTORS_DATA, SET_ERROR, SET_SPEED, SET_STEER } from './constants';

const speed = (state = 0, action) => {
  switch (action.type) {
    case SET_SPEED: return action.payload;
    default: return state;
  }
};

const steer = (state = 0, action) => {
  switch (action.type) {
    case SET_STEER: return action.payload;
    default: return state;
  }
};

const motorsData = (state = { leftMotorSpeed: 0, rightMotorSpeed: 0 }, action) => {
  switch (action.type) {
    case SET_MOTORS_DATA: return action.payload;
    default: return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case SET_ERROR: return action.payload;
    default: return state;
  }
};

module.exports = combineReducers({
  speed,
  steer,
  motorsData,
  error,
});
