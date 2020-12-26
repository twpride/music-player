import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components'

import Playlist from './playlist';
import PlaylistD from './playlistD';
import AudioPlayer from './audio_player'
import AlbumArt from './album_art'
import Navbar from './navbar';
import ContextMenu from './contextMenu'

import Header from './header'
import LoginForm from './login_form'
import SignupForm from './signup_form'

import { initStore } from '../util/api_util'
import { ProtectedRoute } from '../util/route_util'
import { loginThunk } from '../actions/actions'
import { ent_act } from "../reducers/root_reducer"
import SearchResultsD from './searchResultsD'

import { HoverGithub, HoverLinkedin } from './active_svgs'

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  width:100%;

  .scrollable {
    z-index:1;
    min-width:375px;
    overflow-y:auto;
    flex: 1 1 50%;
  }

  .box {
    overflow-y:hidden;
    height:100%;
    display:flex;
    flex-direction: row;
    justify-content:flex-end;
  }

  .full-width {
    z-index:1;
    width:100%;
    overflow-y:auto;
    flex-shrink: 0;
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  a {
    /* width:100%; */
  }
`

const App = () => {

  const dispatch = useDispatch()

  const [winWidth, setWinWidth] = useState(window.innerWidth);
  window.winWith = winWidth;
  useEffect(() => {
    const fetchData = async () => {
      const [songD, playlistTitleD] = await initStore().then(response => response.json())
      // const playlistTitleD = await getPlaylistTitleD().then(response => response.json())
      dispatch({ type: ent_act.INIT_STORE, songD, playlistTitleD })
    }
    fetchData()

    window.addEventListener('resize', () => setWinWidth(window.innerWidth))
  }, [])


  return (
    <AppDiv>
      <Header title='Songs' />
      <div className='box'>
        {winWidth > 730 && <AlbumArt />}
        <Switch>
          <Route exact path='/' >
            <Playlist />
          </Route>
          <Route exact path='/upload' >
            {/* <SearchBox/> */}
            <SearchResultsD />
          </Route>
          <Route path='/playlist_d/:playlist_id'>
            <Playlist />
          </Route>
          <Route path='/playlist_d/'>
            <PlaylistD />
          </Route>
        </Switch>
      </div>
      <AudioPlayer winWidth={winWidth} />
      <Navbar />
      <ContextMenu />
    </AppDiv>
  )
};

const SplashDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100%;
  >button {
    padding: 1.5em;
    color: grey;
  }
  >button:hover {
    padding: 1.5em;
    color: #ad0f37;
  }

  div.favicon-links {
    position:absolute;
    bottom:5em;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    img {
      width:22px;
      height:22px;
    }
  }

`

const svgProps = {
  scale: 0.48,
  size: "50px",
  color: "grey",
  hoverColor: "#ad0f37"
}

export default function Splash() {
  const [mode, setMode] = useState(null)
  const dispatch = useDispatch()

  const demoScript = () => {
    const form = new FormData();
    form.append('email', 'demo1')
    form.append('password', 'demodemo')
    dispatch(loginThunk(form))
  }



  const demoScript2 = () => {
    const form = new FormData();
    form.append('email', 'demo2')
    form.append('password', 'demodemo')
    dispatch(loginThunk(form))
  }

  const Choose = () => (
    <>
      <button onClick={() => setMode('login')}>Log in</button>
      <button onClick={() => setMode('signup')}>Sign up</button>
      <button onClick={demoScript}>Demo User 1</button>
      <button onClick={demoScript2}>Demo User 2</button>
    </>
  )

  let Comp;
  switch (mode) {
    case 'login':
      Comp = LoginForm;
      break;
    case 'signup':
      Comp = SignupForm;
      break;
    default:
      Comp = Choose;
  }
  const currentUser = useSelector(state => state.session.currentUser);
  return (
    <>
      <SplashDiv>
        <ProtectedRoute path='/' component={App} />
        {!currentUser && <Comp setMode={setMode} />}
        {/* we dont use auth route because it doesnt allow 
        for routing to url when logged in*/}
        {!currentUser &&
          <div className="favicon-links">
            <a href='https://github.com/twpride/music-player-1'>
              <HoverGithub {...svgProps}></HoverGithub>
            </a>
            <a href='https://www.linkedin.com/in/howard-hwang-b3000335'>
              <HoverLinkedin {...svgProps}></HoverLinkedin>
            </a>
          </div>
        }
      </SplashDiv>
    </>
  )
}



