import React from 'react';
import styled from 'styled-components'

import LoginForm from './login_form';
import SignupForm from './signup_form';
import User from './user';
import { useSelector } from 'react-redux'

export const LOGIN_M = "LOGIN_M";
export const SIGNUP_M = "SIGNUP_M";
export const USER_M = "USER_M";

const ModalDiv = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: beige;
  z-index: 1;

  .field {
    text-transform: capitalize;
  }
`
export default function Modal() {
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
  return <ModalDiv><Component /></ModalDiv>
}