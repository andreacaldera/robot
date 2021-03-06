import { all } from 'redux-saga/effects';

import {
  loadMotorsSpeed,
  watchResetMotors,
  watchSpeedUp,
  watchSlowDown,
  watchTurnLeft,
  watchTurnRight,
  watchResetSteer,
} from './feet/sagas';

export default function* rootSaga() {
  yield all([
    loadMotorsSpeed(),
    watchResetMotors(),
    watchSpeedUp(),
    watchSlowDown(),
    watchTurnLeft(),
    watchTurnRight(),
    watchResetSteer(),
  ]);
}
