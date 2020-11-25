import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import React, { } from 'react';

import styled from 'styled-components'
import { session_act } from '../reducers/session_reducer';
import { logout } from '../util/session_api_util'

import { useLocation} from 'react-router-dom';

const HeaderDiv = styled.div`


  display: flex;
  align-items: center;

  min-height: 50px;
  justify-content: space-between;
  width: 100%;
  z-index: 10;
  /* border-bottom:solid black 1px; */

  box-shadow: 1px;

`

export default function Header({title}) {
  const dispatch = useDispatch()
  let location = useLocation()
  const currentUser = useSelector(state => state.session.currentUser)
  const logout_call = () => {
    logout().then(
      () => dispatch({ type: session_act.LOGOUT_CURRENT_USER })
    )
  }
  // const path = location.pathname.split('/')
  // if (path[2]) {

  // }
  return (
    <HeaderDiv className="nav">
      <div>{title && title.title}</div>
    </HeaderDiv>
  )
};
