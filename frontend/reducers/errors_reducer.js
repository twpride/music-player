import { combineReducers } from 'redux';


import {session_act} from '../reducers/session_reducer'
import {context_act} from '../reducers/ui_reducer'


export const error_act = {
  RECEIVE_UPLOAD_ERRORS:"RECEIVE_UPLOAD_ERRORS",
}


const session = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case session_act.RECEIVE_SESSION_ERRORS:
      return action.errors;
    case session_act.RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};

const upload = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case error_act.RECEIVE_UPLOAD_ERRORS:
      return action.errors;
    case context_act.UPLOAD_SONGS:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  session
});
