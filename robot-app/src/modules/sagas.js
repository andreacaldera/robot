import feetSagas from './feet/sagas';

export default function* rootSaga() {
  yield [feetSagas.map((saga) => saga())];
}
