import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import React, { } from 'react';

import styled from 'styled-components'
import { session_act } from '../reducers/session_reducer';
import { logout } from '../util/session_api_util'


import add from '../icons/add.svg'
import collection from '../icons/collection.svg'
import playlist from '../icons/playlist.svg'
import ytdl from 'ytdl-core'


interface YtdlBrowserOptions {
    proxyUrl: string; // Ex: 'https://cors-anywhere.herokuapp.com/'
    proxyquireStubs?: any;
}
 
module.exports = (options: YtdlBrowserOptions) => {
    return proxyquire('ytdl-core', {
        miniget(url, opts){
            return realMiniget(options.proxyUrl + url, opts);
        },
        m3u8stream(url, opts){
            return m3u8stream(options.proxyUrl + url, opts);
        },
        ...(options.proxyquireStubs || {})
    });
};







const NavbarDiv = styled.div`
  a {
    display:flex;
    flex-direction:column;
    align-items: center;
    font-size:0.5em;
    color:black;
    text-decoration: none;
    width:60px;
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

export default function Navbar() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser)
  const logout_call = () => {
    logout().then(
      () => dispatch({ type: session_act.LOGOUT_CURRENT_USER })
    )
  }

  async function test (){
    const info = await ytdl.getInfo("https://www.youtube.com/watch?v=8ELbX5CMomE");
    // const dl = ytdl.downloadFromInfo(info, { quality: '251' });
    // dl.pipe(fs.createWriteStream('bieber.webm'));
    console.log(info)
  
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

      <button onClick={test}>hitme</button>
    </NavbarDiv>
  )
};
