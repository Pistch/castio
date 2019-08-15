import {all, fork, takeLatest, getContext, setContext} from 'redux-saga/effects';

import RecordingApi from '../api';
import RecordingDb from '../db';
import actions from '../actions';
import getRecordings from './getRecordings';
import saveRecording from './saveRecording';

export default function* root() {
  yield setContext({
    recordingApi: new RecordingApi(yield getContext('api')),
    recordingDb: new RecordingDb(yield getContext('db'))
  });

  yield fork(saveRecording);

  yield all([takeLatest(actions.list.get, getRecordings)]);
}
