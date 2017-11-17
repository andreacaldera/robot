import { put } from 'redux-saga/effects';

export function* startSaga() {
  yield put({ type: 'SAGA_STARTED' });
}

export default function* rootSaga() {
  yield [
    startSaga(),
  ];
}
