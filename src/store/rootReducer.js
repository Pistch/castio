import {combineReducers} from 'redux';

import recordingReducer from 'castio/src/features/recording/reducers';

export default combineReducers({
  recordings: recordingReducer
});
