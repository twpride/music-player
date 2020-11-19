import { connect, useDispatch, useSelector } from 'react-redux';

import { logout, receiveErrors } from '../actions/session_actions';
import { openModal, openContextMenu } from '../actions/ui_actions';
import { Link } from 'react-router-dom'

import React, { useDebugValue } from 'react';

import Modal, { LOGIN_M, USER_M } from './modal'
import ContextMenu, { SONG_EDIT_C, SONG_BURGER_C } from './contextMenu'

import styled from 'styled-components'

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
  const login = () => { dispatch(openModal(currentUser ? USER_M : LOGIN_M)) }

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

      <Modal className="modalclass" />
      <ContextMenu className="modalclass" />
    </NavbarDiv>
  )
};



