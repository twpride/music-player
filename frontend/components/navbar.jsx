import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import React, { } from 'react';

import styled from 'styled-components'

import { SearchIcon, CollectionIcon, PlaylistsIcon } from './active_svgs'

const NavbarDiv = styled.div`
  a, .upload-button{
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    font-size:8px;
    color:black;
    text-decoration: none;
    width:100%;
    height:100%;
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
const ButtonDiv = styled.div`
  cursor: pointer;
  width:100%;
  height:100%;
  font-size:8px;
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  
  color: ${props => props.color};
  &:hover {
    color: ${props => props.hoverColor};
  }
  &:hover svg{
    fill:${props => props.hoverColor};
  }
  svg{
    fill:${props => props.color};
  }
`;

const hoverColors = {
  color: "black",
  hoverColor: "#ad0f37"
}
const svgSize = {
  scale: 0.9,
  size: "24px",
}

export default function Navbar() {
  const dispatch = useDispatch()

  return (
    <NavbarDiv className="nav">
      <Link to="/">
        <ButtonDiv {...hoverColors}>
          <CollectionIcon {...svgSize} />
          <div>Songs</div>
        </ButtonDiv>
      </Link>

      <Link to="/upload">
        <ButtonDiv {...hoverColors}>
          <SearchIcon {...svgSize} />
          <div>Search</div>
        </ButtonDiv>
      </Link>

      <Link to="/playlist_d/">
      <ButtonDiv {...hoverColors}>
          <PlaylistsIcon {...svgSize} />
          <div>Playlists</div>
        </ButtonDiv>
      </Link>

    </NavbarDiv>
  )
};
