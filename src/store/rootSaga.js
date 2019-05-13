import {fork, all} from 'redux-saga/effects';

import recordingSagas from 'castio/src/features/recording/sagas';

export default function* rootSaga() {
  yield all([fork(recordingSagas)]);
}
