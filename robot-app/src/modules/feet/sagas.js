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
} from './constants';
import { getError } from './selectors';

const callApi = (url, payload) => () =>
  superagent
    .post(url)
    .set('Accept', 'application/json')
    .send(payload)
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
    const motors = yield call(callApi(`${baseApiUrl}/reset-motors`));
    yield put({ type: SET_MOTORS_DATA, payload: motors });
    yield put({ type: SET_STEER, payload: 0 });
    yield put({ type: SET_SPEED, payload: 0 });
  } catch (err) {
    yield setError(err);
  }
}

function* speedUp() {
  try {
    const baseApiUrl = yield select(getBaseApiUrl);
    // TODO actual motors' speed to post to the API?
    const motors = yield call(callApi(`${baseApiUrl}/control-move`));
    yield put({ type: SET_MOTORS_DATA, payload: motors });
    // TODO set returned motors' data
  } catch (err) {
    yield setError(err);
  }
}

function* watchResetMotors() {
  yield takeLatest(RESET_MOTORS, resetMotors);
}

function* watchSpeedUp() {
  yield takeLatest(SPEED_UP, speedUp);
}

export default [watchResetMotors, watchSpeedUp];
