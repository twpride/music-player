import { connect, useDispatch, useSelector } from 'react-redux';

import { logout, receiveErrors } from '../actions/session_actions';
import { openModal, openContextMenu } from '../actions/ui_actions';
import { Link } from 'react-router-dom'

import React, { useDebugValue } from 'react';

import Modal, { LOGIN_M, USER_M } from './modal'
import ContextMenu, { SONG_EDIT_C, SONG_BURGER_C } from './contextMenu'
import './navbar.css'


export default function Navbar() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser)
  const login = () => { dispatch(openModal(currentUser ? USER_M : LOGIN_M)) }
  const cct = () => { dispatch(openContextMenu(SONG_EDIT_C, 2)) }
  return (
    <div className="nav">
      <Link to="/">
        Home
      </Link>
      <div className="user-button"
        onClick={login}>
        user
      </div>

      <div className="user-button"
        onClick={cct}>
        EDIT SONG
      </div>

      <div className="user-button"
        onClick={() => { dispatch(openContextMenu(SONG_BURGER_C, 2)) }}>
        Right Click
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
    </div>
  )
};



