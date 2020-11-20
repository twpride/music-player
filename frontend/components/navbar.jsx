import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import React, { } from 'react';

import styled from 'styled-components'
import { session_act } from '../reducers/session_reducer';
import { logout } from '../util/session_api_util'

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
  const logout_call = () => {
    logout().then(
      () => dispatch({ type: session_act.LOGOUT_CURRENT_USER })
    )
  }

  return (
    <NavbarDiv className="nav">
      <Link to="/">
        Home
      </Link>
      <div className="user-button"
        onClick={logout_call}>
        Log out
      </div>

      <Link to="/upload">
        Upload
      </Link>

      <Link to="/playlist_d/">
        Playlists
      </Link>
    </NavbarDiv>
  )
};
