import { combineReducers } from 'redux';

import {session_act} from '../reducers/session_reducer'
import {ent_act} from '../reducers/root_reducer'

export const error_act = {
  RECEIVE_SEARCH_ERRORS:"RECEIVE_SEARCH_ERRORS",
  RECEIVE_SESSION_ERRORS:"RECEIVE_SESSION_ERRORS",
}

const session = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case error_act.RECEIVE_SESSION_ERRORS:
      return action.errors;
    case session_act.RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};

const search = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case error_act.RECEIVE_SEARCH_ERRORS:
      return action.errors;
    case ent_act.RECEIVE_SEARCH_RESULTS:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  session, search
});
