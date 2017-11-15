import { throttle } from 'redux-saga/effects';
import superagent from 'superagent';

const callApi = (url) => () =>
  superagent(url)
    .set('Accept', 'application/json')
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

function* watchSpeed() {
  yield throttle(1000, 'SET_SPEED', callApi('/api/set-speed'));
}

function* watchSteer() {
  yield throttle(1000, 'STEER', callApi('/api/steer'));
}

export default [watchSpeed, watchSteer];
