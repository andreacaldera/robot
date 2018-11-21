import {
  SLIDE_LEFT,
  SLOW_DOWN,
  SPEED_UP,
  SLIDE_RIGHT,
  RESET_MOTORS,
  PLAY_SOUND,
} from './constants';

export const slideLeft = () => ({
  type: SLIDE_LEFT,
});

export const slideRight = () => ({
  type: SLIDE_RIGHT,
});

export const speedUp = () => ({
  type: SPEED_UP,
});

export const slowDown = () => ({
  type: SLOW_DOWN,
});

export const resetMotors = () => ({
  type: RESET_MOTORS,
});

// TODO does not belong here, move to robot face or something
export const playSound = (sound) => ({
  type: PLAY_SOUND,
  payload: sound,
});
