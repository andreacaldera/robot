import { throttle, select, call, takeLatest, put, takeEvery } from 'redux-saga/effects';
import superagent from 'superagent';

import { RESET_MOTORS, SET_MOTORS_DATA, PLAY_SOUND, SET_ERROR } from './constants';
import { getSpeed, getSteer, getError } from './selectors';
import { getBaseApiUrl } from '../meta/selectors';

const callApi = (url, payload) => () =>
  superagent.post(url)
    .set('Accept', 'application/json')
    .send(payload)
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

const callPlaySoundApi = (url) => ({ payload }) =>
  superagent.get(`${url}/${payload}`)
    .set('Accept', 'application/json')
    .withCredentials()
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
    const motors = yield call(callApi(`${baseApiUrl}/control-move`, { steerValue, speedValue }));
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
  } catch (err) {
    yield setError(err);
  }
}

function* watchSpeed() {
  yield throttle(1000, 'SET_SPEED', controlMove);
}

function* watchSteer() {
  yield throttle(1000, 'SET_STEER', controlMove);
}

function* watchResetMotors() {
  yield takeLatest(RESET_MOTORS, resetMotors);
}

function* watchPlaySound() {
  const baseApiUrl = yield select(getBaseApiUrl);
  yield takeEvery(PLAY_SOUND, callPlaySoundApi(`${baseApiUrl}/play`));
}

export default [watchPlaySound, watchResetMotors, watchSpeed, watchSteer];
