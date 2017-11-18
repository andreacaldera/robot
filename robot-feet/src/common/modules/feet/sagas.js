import { throttle, select, call, takeLatest, put, takeEvery } from 'redux-saga/effects';
import superagent from 'superagent';

import { RESET_MOTORS, SET_MOTORS_DATA, PLAY_SOUND } from './constants';
import { getSpeed, getSteer } from './selectors';

const callApi = (path, payload) => () =>
  superagent.post(`http://192.168.1.109:3001/api/${path}`) // TODO should come from config
    .set('Accept', 'application/json')
    .send(payload)
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

const callPlaySoundApi = () =>
  superagent.get('http://192.168.1.109:3011/api/play/abunai-shiatsu') // TODO should come from config
    .set('Accept', 'application/json')
    .withCredentials()
    .timeout({ response: 9000, deadline: 10000 });


function* controlMove() {
  const steerValue = yield select(getSteer);
  const speedValue = yield select(getSpeed);
  const motors = yield call(callApi('control-move', { steerValue, speedValue }));
  yield put({ type: SET_MOTORS_DATA, payload: motors });
}

function* resetMotors() {
  const motors = yield call(callApi('reset-motors', {}));
  yield put({ type: SET_MOTORS_DATA, payload: motors });
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
  yield takeEvery(PLAY_SOUND, callPlaySoundApi);
}


export default [watchPlaySound, watchResetMotors, watchSpeed, watchSteer];
