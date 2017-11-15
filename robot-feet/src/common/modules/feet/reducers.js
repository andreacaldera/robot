import { combineReducers } from 'redux';

const speed = (state = 0, action) => {
  switch (action.type) {
    case 'SET_SPEED': return action.payload;
    default: return state;
  }
};

const steer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_STEER': return action.payload;
    default: return state;
  }
};

module.exports = combineReducers({
  speed,
  steer,
});
