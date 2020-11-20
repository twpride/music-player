import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import Navbar from './navbar';
import UploadForm from './upload_form';
import SongD from './songD';
import Playlist from './playlist';
import PlaylistD from './playlistD';

import Modal from './modal'
import ContextMenu from './contextMenu'

import styled from 'styled-components'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongD } from '../actions/actions';
import { ProtectedRoute } from '../util/route_util'

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  height:100vh;

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

  const hii = () => <div>hiiiiiiii</div>
  return (
    <AppDiv>
      <Switch>
        <Route exact path='/' component={SongD} />
        <Route exact path='/upload' component={UploadForm} />
        <Route path='/playlist_d/:id' component={Playlist} />
        <Route path='/playlist_d/' component={PlaylistD} />
      </Switch>

      {/* <ProtectedRoute path='/' component={hii} /> */}
      <audio controls src={songUrl} />
      <Navbar />
      <Modal />
      <ContextMenu />
    </AppDiv>
  )
};

export default App;


