import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import Splash from './components/app';
import rootReducer from './reducers/root_reducer.js';

let middleware;

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
} else {
  const { logger } = require(`redux-logger`);
  middleware = applyMiddleware(thunk, logger);
}

const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    middleware
  )
);

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Splash />
    </BrowserRouter>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser.id) {
    const preloadedState = {
      session: { currentUser: window.currentUser },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.store = store
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
 
});