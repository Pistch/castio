import {all, takeLatest, getContext, setContext} from 'redux-saga/effects';

import RecordingApi from '../api';
import actions from '../actions';
import getRecordings from './getRecordings';

export default function* root() {
  yield setContext({
    recordingApi: new RecordingApi(yield getContext('api'))
  });

  yield all([takeLatest(actions.list.get, getRecordings)]);
}
