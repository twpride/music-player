import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components'

import SongD from './songD';
import Playlist from './playlist';
import PlaylistD from './playlistD';
import AudioPlayer from './audio_player'
import AlbumArt from './album_art'
import Navbar from './navbar';
import ContextMenu from './contextMenu'

import Header from './header'
import LoginForm from './login_form'
import SignupForm from './signup_form'

import { getSongD, getPlaylistTitleD } from '../util/api_util'
import { ProtectedRoute } from '../util/route_util'
import { loginThunk } from '../actions/actions'
import { ent_act } from "../reducers/root_reducer"

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
`

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser)

  const [winWidth, setWinWidth] = useState(window.innerWidth);
  window.winWith = winWidth;
  useEffect(() => {
    const fetchData = async () => {
      const songD = await getSongD().then(response => response.json())
      const playlistTitleD = await getPlaylistTitleD().then(response => response.json())
      dispatch({ type: ent_act.INIT_STORE, songD, playlistTitleD })
    }
    fetchData()

    window.addEventListener('resize', () => setWinWidth(window.innerWidth))
  }, [])


  return (
    <AppDiv id="appdiv">
      <Header title='Songs' />
      <div className='box'>
        {winWidth > 730 && <AlbumArt />}
        <Switch>
          <Route exact path='/' >
            <Playlist />
          </Route>
          <Route path='/playlist_d/:playlist_id'>
            <Playlist />
          </Route>
          <Route path='/playlist_d/' component={PlaylistD} />
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
    margin: 1.5em;
  }

  div.favicon-links {
    position:absolute;
    bottom:5em;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width:60px;
    img {
      width:22px;
      height:22px;
    }
  }

`

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
              <img src='https://raw.githubusercontent.com/twpride/music-player-1/main/assets/github.png' />
            </a>
            <a href='https://www.linkedin.com/in/howard-hwang-b3000335'>
              <img src='https://raw.githubusercontent.com/twpride/music-player-1/main/assets/linkedin.png' />
            </a>
          </div>
        }
      </SplashDiv>
    </>
  )
}



