import { select, call, takeLatest, put } from 'redux-saga/effects';
import superagent from 'superagent';

import { getBaseApiUrl } from '../../modules/meta/selectors';

import {
  RESET_MOTORS,
  SET_MOTORS_DATA,
  SET_ERROR,
  SET_SPEED,
  SET_STEER,
  SPEED_UP,
  SLOW_DOWN,
  TURN_LEFT,
  TURN_RIGHT,
  RESET_STEER,
} from './constants';
import { getError, getMotorsData } from './selectors';

const apiPost = (url, payload) => () =>
  superagent
    .post(url)
    .set('Accept', 'application/json')
    .send(payload)
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

const apiGet = (url) => () =>
  superagent
    .get(url)
    .set('Accept', 'application/json')
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

function* setError(err) {
  yield put({ type: SET_ERROR, payload: err.message || null });
}

function* resetError() {
  const error = yield select(getError);
  if (error) {
    yield setError({});
  }
}

function* resetMotors() {
  yield resetError();
  try {
    const baseApiUrl = yield select(getBaseApiUrl);
    const motors = yield call(apiPost(`${baseApiUrl}/reset-motors`));
    yield put({ type: SET_MOTORS_DATA, payload: motors });
    yield put({ type: SET_STEER, payload: 0 });
    yield put({ type: SET_SPEED, payload: 0 });
  } catch (err) {
    yield setError(err);
  }
}

export function* watchResetMotors() {
  yield takeLatest(RESET_MOTORS, resetMotors);
}

export function* watchSpeedUp() {
  function* speedUp() {
    try {
      const baseApiUrl = yield select(getBaseApiUrl);
      const { leftMotorSpeed, rightMotorSpeed } = yield select(getMotorsData);

      const motors = yield call(
        apiPost(`${baseApiUrl}/set-motors`, {
          leftMotorSpeed: leftMotorSpeed + 10,
          rightMotorSpeed: rightMotorSpeed + 10,
        }),
      );
      yield put({ type: SET_MOTORS_DATA, payload: motors });
    } catch (err) {
      yield setError(err);
    }
  }
  yield takeLatest(SPEED_UP, speedUp);
}

export function* watchSlowDown() {
  function* slowDown() {
    try {
      const baseApiUrl = yield select(getBaseApiUrl);
      const { leftMotorSpeed, rightMotorSpeed } = yield select(getMotorsData);

      const motors = yield call(
        apiPost(`${baseApiUrl}/set-motors`, {
          leftMotorSpeed: leftMotorSpeed - 10,
          rightMotorSpeed: rightMotorSpeed - 10,
        }),
      );
      yield put({ type: SET_MOTORS_DATA, payload: motors });
    } catch (err) {
      yield setError(err);
    }
  }
  yield takeLatest(SLOW_DOWN, slowDown);
}

export function* watchTurnLeft() {
  function* turnLeft() {
    try {
      const baseApiUrl = yield select(getBaseApiUrl);
      const { leftMotorSpeed, rightMotorSpeed } = yield select(getMotorsData);

      const motors = yield call(
        apiPost(`${baseApiUrl}/set-motors`, {
          leftMotorSpeed: leftMotorSpeed - 5,
          rightMotorSpeed: rightMotorSpeed + 5,
        }),
      );
      yield put({ type: SET_MOTORS_DATA, payload: motors });
    } catch (err) {
      yield setError(err);
    }
  }

  yield takeLatest(TURN_LEFT, turnLeft);
}

export function* watchTurnRight() {
  function* turnRight() {
    try {
      const baseApiUrl = yield select(getBaseApiUrl);
      const { leftMotorSpeed, rightMotorSpeed } = yield select(getMotorsData);

      const motors = yield call(
        apiPost(`${baseApiUrl}/set-motors`, {
          leftMotorSpeed: leftMotorSpeed + 5,
          rightMotorSpeed: rightMotorSpeed - 5,
        }),
      );
      yield put({ type: SET_MOTORS_DATA, payload: motors });
    } catch (err) {
      yield setError(err);
    }
  }

  yield takeLatest(TURN_RIGHT, turnRight);
}

const getMedianSpeed = (leftMotorSpeed, rightMotorSpeed) => {
  if (leftMotorSpeed <= 0 && rightMotorSpeed <= 0) {
    return (Math.abs(leftMotorSpeed) + Math.abs(rightMotorSpeed)) / -2;
  }

  if (leftMotorSpeed >= 0 && rightMotorSpeed >= 0) {
    return (Math.abs(leftMotorSpeed) + Math.abs(rightMotorSpeed)) / 2;
  }

  if (leftMotorSpeed < 0) {
    return (leftMotorSpeed + rightMotorSpeed) / -2;
  }

  if (rightMotorSpeed < 0) {
    return (leftMotorSpeed + rightMotorSpeed) / -2;
  }

  return 0;
};

export function* watchResetSteer() {
  function* turnRight() {
    try {
      const baseApiUrl = yield select(getBaseApiUrl);
      const { leftMotorSpeed, rightMotorSpeed } = yield select(getMotorsData);

      const speed = getMedianSpeed(leftMotorSpeed, rightMotorSpeed);

      const motors = yield call(
        apiPost(`${baseApiUrl}/set-motors`, {
          leftMotorSpeed: speed,
          rightMotorSpeed: speed,
        }),
      );
      yield put({ type: SET_MOTORS_DATA, payload: motors });
    } catch (err) {
      yield setError(err);
    }
  }

  yield takeLatest(RESET_STEER, turnRight);
}

export function* loadMotorsSpeed() {
  try {
    const baseApiUrl = yield select(getBaseApiUrl);
    const motors = yield call(apiGet(`${baseApiUrl}/motors-speed`));
    yield put({ type: SET_MOTORS_DATA, payload: motors });
  } catch (err) {
    yield setError(err);
  }
}
