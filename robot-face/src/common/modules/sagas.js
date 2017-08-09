import { put } from 'redux-saga/effects';

import faceSagas from './face/sagas';

export function* startSaga() {
  yield put({ type: 'SAGA_STARTED' });
}

export default function* rootSaga() {
  yield [
    startSaga(),
    faceSagas.map((saga) => saga()),
  ];
}
