import { combineReducers } from 'redux';

import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';

export const ent_act = {
  RECEIVE_SONG_D: "RECEIVE_SONG_D",
  RECEIVE_SONG_URL: "RECEIVE_SONG_URL",
  RECEIVE_PLAYLIST: "RECEIVE_PLAYLIST",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  RECEIVE_PLAYLIST_TITLE_D: "RECEIVE_PLAYLIST_TITLE",
  APPEND_PLAYLIST: "APPEND_PLAYLIST",
  LOAD_TRACK: "LOAD_TRACK",
  DELETE_PLAYLIST: "DELETE_PLAYLIST",
  REMOVE_FROM_PLAYLIST: "REMOVE_FROM_PLAYLIST",
  INIT_STORE: "INIT_STORE",
  SET_PLAY: "SET_PLAY",
  SET_PAUSE: "SET_PAUSE",
  DELETE_SONG: 'DELETE_SONG',
  RESET_PLAYLISTS:'RESET_PLAYLISTS',
}

const songD = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.RECEIVE_SONG_D:
      return { ...state, ...action.songD };
    case ent_act.INIT_STORE:
      return action.songD;
    case ent_act.DELETE_SONG:
      const newSongD = { ...state };
      delete newSongD[action.song_id];
      return newSongD;
    default:
      return state;
  }
};

const playlistD = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.INIT_STORE:
      return { ...state, playlistTitleD: action.playlistTitleD };
    case ent_act.RECEIVE_PLAYLIST:
      return { ...state, [action.playlist_id]: action.playlist };
    case ent_act.RECEIVE_PLAYLIST_TITLE_D:
      return {
        ...state, playlistTitleD: {
          ...state.playlistTitleD, ...action.playlistTitleD
        }
      };
    case ent_act.APPEND_PLAYLIST:
      return {
        ...state,
        [action.playlist_id]: [...state[action.playlist_id], ...action.tracks]
      }
    case ent_act.DELETE_PLAYLIST:
      const newSt = { ...state, playlistTitleD: { ...state.playlistTitleD } }
      delete newSt.playlistTitleD[action.playlist_id]
      delete newSt[action.playlist_id]
      return newSt
    case ent_act.REMOVE_FROM_PLAYLIST:
      const newpl = [...state[action.pl_id]]
      newpl.splice(action.idx, 1)
      return { ...state, [action.pl_id]: newpl }
    case ent_act.RESET_PLAYLISTS:
      const st = { ...state}
      action.pls_to_reset.forEach( id => delete st[id])
      return st
    default:
      return state;
  }
};


const player = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.RECEIVE_SONG_URL:
      return { ...state, songUrl: action.url };
    case ent_act.LOAD_TRACK:
      return { ...state, track: action.track };
    case ent_act.RECEIVE_PLAYLIST:
      return { ...state, track: action.track };
    case ent_act.REMOVE_FROM_PLAYLIST:
      return { ...state, track: action.track };
    case ent_act.SET_PLAY:
      return { ...state, playing: true };
    case ent_act.SET_PAUSE:
      return { ...state, playing: false };
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
