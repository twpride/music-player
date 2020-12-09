import React, { useState, useEffect, useRef } from 'react';
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
import { ProtectedRoute, AuthRoute } from '../util/route_util'
import { loginThunk } from '../actions/actions'
import { ent_act } from "../reducers/root_reducer"
import { session_act } from '../reducers/session_reducer'

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  width:100%;

  .scrollable {
    z-index:1;
    min-width:375px;
    /* margin: 0 auto; */
    overflow-y:auto;
    flex: 1 .4 40%;
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

    window.addEventListener('resize', ()=>setWinWidth(window.innerWidth))
  }, [])


  return (
    <AppDiv id="appdiv">
      <Header title='Songs' />
      <div className='box'>
        {winWidth>800 && <AlbumArt />}
        <Switch>
          <Route exact path='/' component={SongD} />
          <Route path='/playlist_d/:playlist_id' component={Playlist} />
          <Route path='/playlist_d/' component={PlaylistD} />
        </Switch>
      </div>
      <AudioPlayer winWidth={winWidth}/>
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
`
export default function Splash() {
  const [mode, setMode] = useState(null)
  const dispatch = useDispatch()

  const demoScript = () => {
    const form = new FormData();
    form.append('email', 'demo1@demo.com')
    form.append('password', 'demodemo')
    dispatch(loginThunk(form))
  }

  useEffect(() => {
    dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors: [] })
  })

  const demoScript2 = () => {
    const form = new FormData();
    form.append('email', 'asdf')
    form.append('password', 'asdfasdf')
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
        <ProtectedRoute exact path='/' component={App} />
        <AuthRoute path='/' component={Comp} setMode={setMode}/>
      </SplashDiv>
    </>
  )
}



