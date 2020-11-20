import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from '../util/route_util'
import styled from 'styled-components'

import Navbar from './navbar';
import UploadForm from './upload_form';
import SongD from './songD';
import Playlist from './playlist';
import PlaylistD from './playlistD';
import Modal from './modal'
import ContextMenu from './contextMenu'
import LoginForm from './login_form_splash'
import SignupForm from './signup_form_splash'

import { getSongD, loginThunk } from '../actions/actions'

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;

  >div:first-child {
    height:90%;
    overflow:scroll;
  }
`
const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongD())
  }, [])

  const songUrl = useSelector(state => state.player.songUrl)

  return (
    <AppDiv>
      <div>
        <Switch>
          <Route exact path='/' component={SongD} />
          <Route path='/upload' component={UploadForm} />
          <Route path='/playlist_d/:id' component={Playlist} />
          <Route path='/playlist_d/' component={PlaylistD} />
        </Switch>
      </div>

      <audio controls src={songUrl} />
      <Navbar />
      <Modal />
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
  button {
    margin: 0.7em;
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

  const Choose = () => (
    <>
      <button onClick={() => setMode('login')}>Log in</button>
      <button onClick={() => setMode('signup')}>Sign up</button>
      <button onClick={demoScript}>Demo</button>
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
  return (
    <>
      <SplashDiv>
        <ProtectedRoute path='/' component={App} />
        <AuthRoute path='/' component={Comp} setMode={setMode} />
      </SplashDiv>
    </>
  )
}



