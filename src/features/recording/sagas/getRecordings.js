import {getContext, put, call} from 'redux-saga/effects';

import actions from '../actions';

export default function* getRecordings() {
  const api = yield getContext('recordingApi');

  const recordings = yield call([api, api.getRecordings]);

  yield put(
    actions.list.set(
      recordings.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {})
    )
  );
}
