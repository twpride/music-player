import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util'
import styled from 'styled-components'

import Navbar from './navbar';
import Header from './header'
import UploadForm from './upload_form';
import SongD from './songD';
import Playlist from './playlist';
import PlaylistD from './playlistD';
import Modal from './modal'
import ContextMenu from './contextMenu'
import LoginForm from './login_form_splash'
import SignupForm from './signup_form_splash'

import { loginThunk } from '../actions/actions'
import { getSongD, getPlaylistTitleD } from '../util/api_util'
import { ent_act } from "../reducers/root_reducer"
import { getSongUrl } from '../actions/actions'
const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  width:100%;

  .scrollable {
    height:90%;
    overflow:scroll;
  }
`
const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    getSongD()
      .then(response => response.json())
      .then(songD => dispatch({ type: ent_act.RECEIVE_SONG_D, songD }));

    getPlaylistTitleD()
      .then(response => response.json())
      .then(playlistTitleD => dispatch(
        { type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD }
      ));

    window.xxx = document.querySelector('audio');
  }, [])


  const audEle = useCallback(
    node => {
      if (node !== null) {
        // console.log(node)
      }
    }, []);

  const songUrl = useSelector(state => state.player.songUrl)
  const playlist_dir = useSelector(state => state.entities.playlistD)


  const track = useSelector(state => state.player.track)
  const playNext = () => {
    console.log("next",track)
    const newtr = [...track]
    newtr[1]+=1

    let song_id
    if (song_id = playlist_dir[newtr[0]][newtr[1]]){
      dispatch(getSongUrl(song_id[0]))
      dispatch({type:ent_act.LOAD_TRACK, track:newtr})
    }
  }

  // useEffect(() => {
  //   const song_id=
  //   dispatch(getSongUrl(song_id))
  // }, [trac])

  return (
    <AppDiv id="appdiv">
      <Route path='/' component={Header} />
      <div className="scrollable">
        <Switch>
          <Route exact path='/' component={SongD} />
          <Route exact path='/upload' component={UploadForm} />
          <Route path='/playlist_d/:id' component={Playlist} />
          <Route path='/playlist_d/' component={PlaylistD} />
        </Switch>
      </div>

      <audio controls src={songUrl} ref={audEle} autoPlay onEnded={playNext} />
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



