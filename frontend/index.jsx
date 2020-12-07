import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import App from './components/app';
import rootReducer from './reducers/root_reducer.js';
import AudioVisualizer from './components/renderFunc'


const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App store={store} />
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
 
  // const visualizer = new AudioVisualizer()
  // visualizer.startRenderer()

  // function resumeAudioCtx(e) {
  //   visualizer.audctx.resume()
  //   window.removeEventListener('touchend', resumeAudioCtx)
  // }
  // window.addEventListener('touchend',resumeAudioCtx)
});