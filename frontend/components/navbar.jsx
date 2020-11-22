import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import React, { } from 'react';

import styled from 'styled-components'
import { session_act } from '../reducers/session_reducer';
import { logout } from '../util/session_api_util'

import add from '../icons/add.svg'
import collection from '../icons/collection.svg'
import playlist from '../icons/playlist.svg'

const NavbarDiv = styled.div`
  a {
    display:flex;
    flex-direction:column;
    align-items: center;
    font-size:0.5em;
    color:black;
    text-decoration: none;
    width:60px;
  }

  display: flex;
  align-items: center;

  min-height: 50px;
  justify-content: space-around;
  width: 100%;
  border-top: 1px solid lightgrey;


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
        <img src={collection} />
        <div>Songs</div>
      </Link>
      {/* <div className="user-button"
        onClick={logout_call}>
        Log out
      </div> */}

      <Link to="/upload">
        <img src={add} />
        <div>Upload</div>
      </Link>

      <Link to="/playlist_d/">
        <img src={playlist} />
        <div>Playlists</div>
      </Link>
    </NavbarDiv>
  )
};
