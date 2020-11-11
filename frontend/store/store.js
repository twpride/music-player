import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../components/root_reducer.js';


const ps = { entities: { playlistD: {}, songD: {} } }

const configureStore = (preloadedState = ps) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
