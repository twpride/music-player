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
import Intro from './intro';
import SongD from './songD';
import Playlist from './playlist';
import PlaylistD from './playlistD';
import Test from './styletest';

import './app.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSongD } from './actions';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongD())
  }, [])

  const songUrl = useSelector(state => state.player.songUrl)

  return (
    <div className="app-container">

      <Switch>
        <Route exact path="/" component={SongD} />
        <Route exact path="/upload">
          <Intro />
        </Route>
        <Route path="/playlist_d/:id" component={Playlist} />
        <Route path={`/playlist_d/`}>
          <PlaylistD />
        </Route>
        <Route path={`/styletest`}>
          <Test />
        </Route>
      </Switch>

      <audio controls src={songUrl} />

      <Navbar />
    </div>
  )
};

export default App;


