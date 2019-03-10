import {
  SLIDE_LEFT,
  SLOW_DOWN,
  SPEED_UP,
  SLIDE_RIGHT,
  TURN_LEFT,
  RESET_MOTORS,
  TURN_RIGHT,
  RESET_STEER,
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

export const turnLeft = () => ({
  type: TURN_LEFT,
});

export const turnRight = () => ({
  type: TURN_RIGHT,
});

export const resetSteer = () => ({
  type: RESET_STEER,
});

export const resetMotors = () => ({
  type: RESET_MOTORS,
});
