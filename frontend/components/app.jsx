import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components'

import SongD from './songD';
import UploadForm from './upload_form';
import Playlist from './playlist';
import PlaylistD from './playlistD';
import AudioPlayer from './audio_player'
import Navbar from './navbar';
import ContextMenu from './contextMenu'

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
    height:95%;
    overflow-y:auto;
    z-index:1;
    /* max-width:500px;
    margin: 0 auto; */
  }
`


const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser)

  useEffect(() => {
    const fetchData = async () => {
      const songD = await getSongD().then(response => response.json())
      const playlistTitleD = await getPlaylistTitleD().then(response => response.json())
      dispatch({ type: ent_act.INIT_STORE, songD, playlistTitleD })
    }
    fetchData()
  }, [])

  return (
    <AppDiv id="appdiv">
      <Switch>
        <Route exact path='/' component={SongD} />
        <Route exact path='/upload' component={UploadForm} />
        <Route path='/playlist_d/:playlist_id' component={Playlist} />
        <Route path='/playlist_d/' component={PlaylistD} />
      </Switch>
      <AudioPlayer />
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
      <button onClick={demoScript}>Demo</button>
      <button onClick={demoScript2}>Demo2</button>
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
        {!currentUser && <Comp setMode={setMode} />}
      </SplashDiv>
    </>
  )
}



