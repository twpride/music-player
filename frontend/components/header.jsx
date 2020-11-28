import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';

import styled from 'styled-components'

import { useLocation} from 'react-router-dom';
import { session_act } from '../reducers/session_reducer';
import { logout } from '../util/session_api_util'

export const HeaderDiv = styled.div`

  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;

  min-height: 50px;
  width: 100%;
  z-index: 10;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.03), 0 3px 3px -2px rgba(0,0,0,0.03), 0 1px 8px 0 rgba(0,0,0,0.05);

  .title {
    justify-self:center;
  }
`

export default function Header({title}) {
  const dispatch = useDispatch()
  let location = useLocation()
  const currentUser = useSelector(state => state.session.currentUser)

  return (
    <HeaderDiv className="nav">
      <div className='title'>{title}</div>
      <button onClick={() => {
          logout().then(
            () => dispatch({ type: session_act.LOGOUT_CURRENT_USER })
          )
        }
        }>logout</button>
    </HeaderDiv>
  )
};
