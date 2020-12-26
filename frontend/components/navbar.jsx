import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import React, { } from 'react';

import styled from 'styled-components'

import collection from '../icons/collection.svg'
import playlist from '../icons/playlist.svg'

import { HoverSearch } from './active_svgs'

const NavbarDiv = styled.div`
  a, .upload-button{
    display:flex;
    flex-direction:column;
    align-items: center;
    font-size:0.5em;
    color:black;
    text-decoration: none;
    width:60px;
    cursor: pointer;
    svg {
      width:24px;
      height:24px;
    }
  }

  display: flex;
  align-items: center;

  min-height: 50px;
  justify-content: space-around;
  width: 100%;
  border-top: 1px solid lightgrey;

`
const svgProps = {
  scale: 0.9,
  size: "24px",
  color: "grey",
  hoverColor: "#ad0f37"
}

export default function Navbar() {
  const dispatch = useDispatch()

  return (
    <NavbarDiv className="nav">
      <Link to="/">
        <img src={collection} />
        <div>Songs</div>
      </Link>

      <Link to="/upload">
        <HoverSearch {...svgProps} />
        <div>Search</div>
      </Link>

      <Link to="/playlist_d/">
        <img src={playlist} />
        <div>Playlists</div>
      </Link>

    </NavbarDiv>
  )
};
