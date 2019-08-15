import {getContext, put, call, delay} from 'redux-saga/effects';

export default function* saveRecording() {
  yield delay(1000);

  const db = yield getContext('recordingDb');

  const lolo = yield call([db, db.test]);

  console.log(lolo);
}
