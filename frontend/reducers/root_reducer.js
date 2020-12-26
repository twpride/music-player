import { combineReducers } from 'redux';

import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';

export const ent_act = {
  RECEIVE_SONG_D: "RECEIVE_SONG_D",
  RECEIVE_SONG_D_EDIT: "RECEIVE_SONG_D_EDIT",
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
  RESET_PLAYLISTS: 'RESET_PLAYLISTS',
  RECEIVE_SEARCH_RESULTS: 'RECEIVE_SEARCH_RESULTS',
  CLEAR_SEARCH_RESULTS: 'CLEAR_SEARCH_RESULTS',
  SET_LOADING: 'SET_LOADING',
}

const songD = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.RECEIVE_SONG_D:
      return {
        ...state, ...action.songD, yt_id_set: new Set(
          [
            ...state.yt_id_set,
            ...Object.values(action.songD).map(e => e.yt_id)
          ]
        )
      };
    case ent_act.RECEIVE_SONG_D_EDIT:
      return { ...state, ...action.songD };
    case ent_act.INIT_STORE:
      return { ...state, ...action.songD, yt_id_set: new Set(Object.values(action.songD).map(e => e.yt_id)) };
    case ent_act.DELETE_SONG:
      const newSongD = { ...state };
      delete newSongD[action.song_id];

      const ns = new Set(state.yt_id_set)
      ns.delete(state[action.song_id].yt_id)

      newSongD.yt_id_set=ns;
      return newSongD;
    default:
      return state;
  }
};

const playlistD = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.INIT_STORE:
      const songs_playlist = Object.values(action.songD)
        //  .sort((a,b)=>parseInt(b.order)-parseInt(a.order))
        .sort((b, a) => parseInt(b.order) - parseInt(a.order))
        .map(e => [e.id, null])
      return { ...state, songs_playlist };
    case ent_act.RECEIVE_SONG_D:
      const new_songs = Object.values(action.songD)
        // .sort((a,b)=>parseInt(b.order)-parseInt(a.order))
        .sort((b, a) => parseInt(b.order) - parseInt(a.order))
        .map(e => [e.id, null])
      // return { ...state, songs_playlist: [...new_songs, ...state.songs_playlist]};
      return { ...state, songs_playlist: [...state.songs_playlist, ...new_songs] };
    case ent_act.DELETE_SONG:
      return { ...state, songs_playlist: state.songs_playlist.filter(el => el[0] != action.song_id) };
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
      const st = { ...state }
      action.pls_to_reset.forEach(id => delete st[id])
      return st
    default:
      return state;
  }
};


const player = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.RECEIVE_SONG_URL:
      return { ...state, songUrl: action.url };
    case ent_act.LOAD_TRACK:
      return { ...state, track: action.track };
    case ent_act.RECEIVE_PLAYLIST:
      if (action.track) return { ...state, track: action.track };
      else return state;
    case ent_act.REMOVE_FROM_PLAYLIST:
      if (action.track) return { ...state, track: action.track };
      else return state;
    case ent_act.DELETE_SONG:
      if (action.track) return { ...state, track: action.track };
      else return state;
    case ent_act.SET_PLAY:
      return { ...state, playing: true };
    case ent_act.SET_PAUSE:
      return { ...state, playing: false };
    default:
      return state;
  }
};

const search = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ent_act.INIT_STORE:
      return {};
    case ent_act.RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        search_term: action.search_term,
        search_results: action.search_results,
      }
    case ent_act.CLEAR_SEARCH_RESULTS:
      return { ...state, search_term: "", search_results: [] }
    case ent_act.SET_LOADING:
      return { ...state, loading: action.status }
    default:
      return state;
  }
};

const entities = combineReducers({
  playlistD,
  songD,
  search
});

const rootReducer = combineReducers({
  entities,
  session,
  errors,
  ui,
  player
});

export default rootReducer;
