import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import React, { } from 'react';

import styled from 'styled-components'
import { modal_act } from '../reducers/ui_reducer';

const NavbarDiv = styled.div`
a.logo{
  margin-left: 10px;
  margin-right: 10px;
}

  display: flex;
  align-items: center;

  min-height: 100px;
  justify-content: space-between;
  width: 100%;
  z-index: 10;

.modalclass {
  z-index: 10;
}

.nav-logo {
  height: 48px;
  width: 48px;
}

img.logo {
  width: 80px;
}
`

export default function Navbar() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser)
  const login = () => {
    const type = currentUser ? modal_act.USER_M : modal_act.LOGIN_M;
    dispatch({ type })
  }

  return (
    <NavbarDiv className="nav">
      <Link to="/">
        Home
      </Link>
      <div className="user-button"
        onClick={login}>
        user
      </div>

      <Link to="/upload">
        Upload
      </Link>

      <Link to="/playlist_d/">
        Playlists
      </Link>

      <Link to="/styletest">
        TEST
      </Link>
    </NavbarDiv>
  )
};
