import { combineReducers } from 'redux';

export const context_act = {
  SONG_EDIT_C: "SONG_EDIT_C",
  SONG_BURGER_C: "SONG_BURGER_C",
  PLAYLIST_BURGER_C: "PLAYLIST_BURGER_C",
  CLOSE_CONTEXT: "CLOSE_CONTEXT",
  SELECT_PLAYLIST_C: "SELECT_PLAYLIST_C",
  PLAYLIST_EDIT_C: "PLAYLIST_EDIT_C",
  NEW_PLAYLIST: 'NEW_PLAYLIST',
  ACCOUNT: "ACCOUNT",
}

export const error_act = {
  RECEIVE_SEARCH_ERRORS: "RECEIVE_SEARCH_ERRORS",
  RECEIVE_SESSION_ERRORS: "RECEIVE_SESSION_ERRORS",
}

export const session_act = {
  RECEIVE_CURRENT_USER: "RECEIVE_CURRENT_USER",
  LOGOUT_CURRENT_USER: "LOGOUT_CURRENT_USER",
  RECEIVE_SESSION_ERRORS: "RECEIVE_SESSION_ERRORS",
}

export const ent_act = {
  INIT_STORE: "INIT_STORE",
  RECEIVE_SONG_D: "RECEIVE_SONG_D",
  RECEIVE_SONG_D_EDIT: "RECEIVE_SONG_D_EDIT",
  DELETE_SONG: 'DELETE_SONG',
  RECEIVE_SONG_URL: "RECEIVE_SONG_URL",

  RECEIVE_PLAYLIST: "RECEIVE_PLAYLIST",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  RECEIVE_PLAYLIST_TITLE_D: "RECEIVE_PLAYLIST_TITLE",
  APPEND_PLAYLIST: "APPEND_PLAYLIST",
  DELETE_PLAYLIST: "DELETE_PLAYLIST",
  RESET_PLAYLISTS: 'RESET_PLAYLISTS',
  REMOVE_FROM_PLAYLIST: "REMOVE_FROM_PLAYLIST",

  LOAD_TRACK: "LOAD_TRACK",
  SET_PLAY: "SET_PLAY",
  SET_PAUSE: "SET_PAUSE",

  RECEIVE_SEARCH_RESULTS: 'RECEIVE_SEARCH_RESULTS',
  CLEAR_SEARCH_RESULTS: 'CLEAR_SEARCH_RESULTS',
  SET_LOADING: 'SET_LOADING',
}

////////////// UI Reducer //////////////////
const contextMenu = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case context_act.SONG_BURGER_C:
      return action
    case context_act.PLAYLIST_BURGER_C:
      return action
    case context_act.NEW_PLAYLIST:
      return action
    case context_act.ACCOUNT:
      return action
    case context_act.SONG_EDIT_C:
      return { ...state, type: action.type }
    case context_act.PLAYLIST_EDIT_C:
      return { ...state, type: action.type }
    case context_act.SELECT_PLAYLIST_C:
      return { ...state, type: action.type }
    case context_act.CLOSE_CONTEXT:
      return null
    default:
      return state;
  }
};
const ui = combineReducers({
  contextMenu
});
////////////// UI Reducer //////////////////


////////////// Errors Reducer //////////////////
const sessionErrors = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case error_act.RECEIVE_SESSION_ERRORS:
      return action.errors;
    case session_act.RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};
const searchErrors = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case error_act.RECEIVE_SEARCH_ERRORS:
      return action.errors;
    case ent_act.RECEIVE_SEARCH_RESULTS:
      return []
    default:
      return state;
  }
};
const errors = combineReducers({
  sessionErrors, searchErrors
});
///////////// Errors Reducer //////////////////


///////////// Session Reducer //////////////////
const _nullUser = Object.freeze({
  currentUser: null
});
const session = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case session_act.RECEIVE_CURRENT_USER:
      return { currentUser: action.currentUser };
    case session_act.LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return state;
  }
};
///////////// Session Reducer //////////////////


///////////// Entities Reducer //////////////////
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

      newSongD.yt_id_set = ns;
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
      return {
        ...state,
        songs_playlist,
        playlistTitleD: action.playlistTitleD
      };
    case ent_act.RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        search_results: action.search_results
      }
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
      return { ...state, track: action.track };
    case ent_act.REMOVE_FROM_PLAYLIST:
      return { ...state, track: action.track };
    case ent_act.DELETE_SONG:
      return { ...state, track: action.track };
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
///////////// Entities Reducer //////////////////


const rootReducer = combineReducers({
  entities,
  session,
  errors,
  ui,
  player
});

export default rootReducer;
