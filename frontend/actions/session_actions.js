import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
import { closeModal } from './ui_actions'

// import 'babel-polyfill'; // for await syntax compat
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
  APIUtil.signup(user).then(res => {
    if (res.ok) {
      res.json().then(user => {
        dispatch(receiveCurrentUser(user))
        dispatch(closeModal())
      })
    } else {
      res.json().then(error => {
        dispatch(receiveErrors(error))
      })
    }
  })
)



// export const login = user => async dispatch => {
//   const res = await APIUtil.login(user)
//   if (res.ok) {
//     const user = await res.json()
//     dispatch(receiveCurrentUser(user))
//     dispatch(closeModal())
//   } else {
//     const error = await res.json()
//     dispatch(receiveErrors(error))
//   }
// }



export const logout = () => dispatch => {
  APIUtil.logout().then(() => {
    dispatch(logoutCurrentUser())
    dispatch(closeModal())
  })
};
