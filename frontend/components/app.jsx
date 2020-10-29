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
import Builder from './builder';
import './app.css'

import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {


  return (
    <div className="app-container">

      <Navbar/>

      <Switch>
        <Route exact path="/">
          <Intro/>
        </Route>
        <Route path="/order/build">
          <Builder entree = "burrito"/>
        </Route>
      </Switch>


    </div>
  )
};

export default App;


