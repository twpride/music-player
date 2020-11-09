import { combineReducers } from 'redux';

// import entities from '../reducers/entities_reducer';
import session from '../reducers/session_reducer';
import errors from '../reducers/errors_reducer';
import ui from '../reducers/ui_reducer';


// import menu from '../reducers/menu_reducer';

import {
  RECEIVE_SONG,
  RECEIVE_SONGS,
  RECEIVE_SONG_URL,
  RECEIVE_PLAYLIST,
  RECEIVE_PLAYLISTS
} from './actions';

const songs = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
      return { ...state, [action.song.id]: action.song };
    case RECEIVE_SONGS:
      return action.songs;
    default:
      return state;
  }
};

const playlists = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PLAYLIST:
      return { ...state, [action.id]: action.playlist };
    case RECEIVE_PLAYLISTS:
      return action.playlists;
    default:
      return state;
  }
};


const player = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG_URL:
      return { ...state, songUrl: action.url };
    default:
      return state;
  }
};

const entities = combineReducers({
  playlists,
  songs
});

const rootReducer = combineReducers({
  entities,
  session,
  errors,
  ui,
  player
});

export default rootReducer;
