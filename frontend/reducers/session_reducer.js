const _nullUser = Object.freeze({
  currentUser: null
});

export const session_act = {
  RECEIVE_CURRENT_USER:"RECEIVE_CURRENT_USER",
  LOGOUT_CURRENT_USER: "LOGOUT_CURRENT_USER",
  RECEIVE_SESSION_ERRORS: "RECEIVE_SESSION_ERRORS",
}

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case session_act.RECEIVE_CURRENT_USER:
      return { currentUser: action.currentUser};
    case session_act.LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return state;
  }
};

export default sessionReducer;
