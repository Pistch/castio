import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import actions from '../actions';

const INITIAL_STATE = {
  byId: {}
};

export default combineReducers({
  byId: handleActions(
    {
      [actions.list.set]: (state, {payload}) => payload
    },
    INITIAL_STATE.byId
  )
});
