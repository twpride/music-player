import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null
});

export const session = {
  RECEIVE_CURRENT_USER:"RECEIVE_CURRENT_USER",
  LOGOUT_CURRENT_USER: "LOGOUT_CURRENT_USER",
  RECEIVE_SESSION_ERRORS: "RECEIVE_SESSION_ERRORS",
}

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case session.RECEIVE_CURRENT_USER:
      return { currentUser: action.currentUser};
    case session.LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return state;
  }
};

export default sessionReducer;
