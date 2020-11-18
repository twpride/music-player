import React from 'react';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import User from './user';
import SongEditForm from './song_edit_form';
import {useSelector} from 'react-redux'
 
export const LOGIN_M = "LOGIN_M";
export const SIGNUP_M = "SIGNUP_M";
export const USER_M = "USER_M";
export const SONG_EDIT_C = "SONG_EDIT_C";
// import './login_signup_form.css'
export default function Modal(props) {
  const modal = useSelector(state => state.ui.modal);
  if (!modal) {
    return null;
  }
  let Component;
  switch (modal) {
    case LOGIN_M:
      Component = LoginForm;
      break;
    case SIGNUP_M:
      Component = SignupForm;
      break;
    case USER_M:
      Component = User;
      break
    default:
      return null;
  }
  return <Component className="modalclass"/>
}