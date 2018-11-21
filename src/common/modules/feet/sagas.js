import {
  throttle,
  select,
  call,
  takeLatest,
  put,
  takeEvery,
} from 'redux-saga/effects';
import superagent from 'superagent';

import {
  RESET_MOTORS,
  SET_MOTORS_DATA,
  PLAY_SOUND,
  SET_ERROR,
  SPEED_UP,
  SLOW_DOWN,
  SET_SPEED,
  SET_STEER,
  SLIDE_LEFT,
  SLIDE_RIGHT,
} from './constants';
import { getSpeed, getSteer, getError } from './selectors';
import { getBaseApiUrl } from '../meta/selectors';

const callApi = (url, payload) => () =>
  superagent
    .post(url)
    .set('Accept', 'application/json')
    .send(payload)
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

const callPlaySoundApi = (url) => ({ payload }) =>
  superagent
    .get(`${url}/${payload}`)
    .set('Accept', 'application/json')
    .timeout({ response: 9000, deadline: 10000 });

function* setError(err) {
  yield put({ type: SET_ERROR, payload: err.message || null });
}

function* resetError() {
  const error = yield select(getError);
  if (error) {
    yield setError({});
  }
}

function* controlMove() {
  yield resetError();
  try {
    const steerValue = yield select(getSteer);
    const speedValue = yield select(getSpeed);
    const baseApiUrl = yield select(getBaseApiUrl);
    const motors = yield call(
      callApi(`${baseApiUrl}/control-move`, { steerValue, speedValue })
    );
    yield put({ type: SET_MOTORS_DATA, payload: motors });
  } catch (err) {
    yield setError(err);
  }
}

function* resetMotors() {
  yield resetError();
  try {
    const baseApiUrl = yield select(getBaseApiUrl);
    const motors = yield call(callApi(`${baseApiUrl}/reset-motors`));
    yield put({ type: SET_MOTORS_DATA, payload: motors });
    yield put({ type: SET_STEER, payload: 0 });
    yield put({ type: SET_SPEED, payload: 0 });
  } catch (err) {
    yield setError(err);
  }
}

function* watchSpeed() {
  yield throttle(1000, SET_SPEED, controlMove);
}

function* watchSteer() {
  yield throttle(1000, SET_STEER, controlMove);
}

function* watchSpeedUp() {
  yield throttle(500, SPEED_UP, function* speedUp() {
    const speedValue = yield select(getSpeed);
    yield put({ type: SET_SPEED, payload: speedValue + 10 });
  });
}

function* watchSlowDown() {
  yield throttle(500, SLOW_DOWN, function* slowDown() {
    const speedValue = yield select(getSpeed);
    yield put({ type: SET_SPEED, payload: speedValue - 10 });
  });
}

function* watchSlideLeft() {
  yield throttle(500, SLIDE_LEFT, function* slideLeft() {
    const steerValue = yield select(getSteer);
    yield put({ type: SET_STEER, payload: steerValue - 10 });
  });
}

function* watchSlideRight() {
  yield throttle(500, SLIDE_RIGHT, function* slideLeft() {
    const steerValue = yield select(getSteer);
    yield put({ type: SET_STEER, payload: steerValue + 10 });
  });
}

function* watchResetMotors() {
  yield takeLatest(RESET_MOTORS, resetMotors);
}

function* watchPlaySound() {
  const baseApiUrl = yield select(getBaseApiUrl);
  yield takeEvery(PLAY_SOUND, callPlaySoundApi(`${baseApiUrl}/play`));
}

export default [
  watchPlaySound,
  watchResetMotors,
  watchSpeed,
  watchSteer,
  watchSpeedUp,
  watchSlowDown,
  watchSlideLeft,
  watchSlideRight,
];
