import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
import { closeModal } from './modal_actions'

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = user => dispatch => (
  APIUtil.signup(user)
    .then(response => response.json())
    .then(user => {
      if (user.firstName) {
        dispatch(receiveCurrentUser(user))
        console.log('this is fucked')
        dispatch(closeModal())
      } else {
        dispatch(receiveErrors(user))
      }
    })
)

export const login = user => dispatch => (
  APIUtil.login(user)
    .then(response => response.json())
    .then(user => {
      console.log(user)
      if (user.firstName) {
        dispatch(receiveCurrentUser(user))
        dispatch(closeModal())
      } else {
        dispatch(receiveErrors(user))
      }
    })
)

export const logout = () => dispatch => {
  APIUtil.logout()
    .then(() => {
      dispatch(logoutCurrentUser())
      dispatch(closeModal())
    })
};


// export const logout = () => dispatch => (
//   APIUtil.logout()
//     .then(() => dispatch(logoutCurrentUser()))
//     .then(() => dispatch(closeModal()))
// );
