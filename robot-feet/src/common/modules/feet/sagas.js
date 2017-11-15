import { throttle, select, call } from 'redux-saga/effects';
import superagent from 'superagent';

import { getSpeed, getSteer } from './selectors';

const callApi = (url, payload) => () =>
  superagent.post(url)
    .set('Accept', 'application/json')
    .send(payload)
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

function* controlMove() {
  const steerValue = yield select(getSteer);
  const speedValue = yield select(getSpeed);
  yield call(callApi('/api/control-move', { steerValue, speedValue }));
}

function* watchSpeed() {
  yield throttle(1000, 'SET_SPEED', controlMove);
}

function* watchSteer() {
  yield throttle(1000, 'SET_STEER', controlMove);
}

export default [watchSpeed, watchSteer];
