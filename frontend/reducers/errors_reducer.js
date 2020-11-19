import { combineReducers } from 'redux';


import {session_act} from '../reducers/session_reducer'

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

export default combineReducers({
  session
});
