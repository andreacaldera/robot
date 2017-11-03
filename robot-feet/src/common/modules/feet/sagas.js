import { takeLatest } from 'redux-saga/effects';
import superagent from 'superagent';

const callMoveApi = () =>
  superagent('/api/move')
    .set('Accept', 'application/json')
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

function* move() {
  yield callMoveApi();
}

function* watchMove() {
  yield takeLatest('MOVE', move);
}

export default [watchMove];
