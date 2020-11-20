import { combineReducers } from 'redux';

// import entities from '../reducers/entities_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';




export const ent_act = {
  RECEIVE_SONG: "RECEIVE_SONG",
  RECEIVE_SONG_D: "RECEIVE_SONG_D",
  RECEIVE_SONG_URL: "RECEIVE_SONG_URL",
  RECEIVE_PLAYLIST: "RECEIVE_PLAYLIST",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  RECEIVE_PLAYLIST_TITLE_D: "RECEIVE_PLAYLIST_TITLE"
}

const songD = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.RECEVE_SONG:
      return { ...state, [action.song.id]: action.song };
    case ent_act.RECEIVE_SONG_D:
      return { ...state, ...action.songD };
    default:
      return state;
  }
};

const playlistD = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.RECEIVE_PLAYLIST:
      return { ...state, [action.id]: action.playlist };
    case ent_act.RECEIVE_PLAYLIST_TITLE_D:
      return { ...state, playlistTitleD: action.playlistTitleD };
    default:
      return state;
  }
};


const player = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.RECEIVE_SONG_URL:
      return { ...state, songUrl: action.url };
    default:
      return state;
  }
};

const entities = combineReducers({
  playlistD,
  songD
});

const rootReducer = combineReducers({
  entities,
  session,
  errors,
  ui,
  player
});

export default rootReducer;
