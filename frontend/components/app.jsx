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
import SongList from './songlist';
import Playlist from './playlist';
import './app.css';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getSongs} from './actions';

const App = () => {
  
  const dispatch = useDispatch()
  
  useEffect( ()=> {
    dispatch(getSongs())
  }, [])

  const songUrl = useSelector(state => state.player.songUrl)

  return (
    <div className="app-container">


      <Switch>
        <Route exact path="/">
          <Intro/>
        </Route>
        <Route path="/songlist" component={SongList} />
        <Route path="/playlists/:id" component={Playlist} />
        {/* <Route path={`/playlist/${}`}>
          <SongList/>
        </Route> */}
      </Switch>
      
      <audio controls src={songUrl}/>

      <Navbar/>
    </div>
  )
};

export default App;


