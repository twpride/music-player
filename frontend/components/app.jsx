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
import './app.css';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getSongs} from './actions';

const App = () => {
  
  // const dispatch = useDispatch()
  
  // useEffect( ()=> {
  //   dispatch(getSongs())
  // }, [])

  return (
    <div className="app-container">

      <Navbar/>

      <Switch>
        <Route exact path="/">
          <Intro/>
        </Route>
        <Route path="/songlist">
          <SongList/>
        </Route>
      </Switch>


    </div>
  )
};

export default App;


