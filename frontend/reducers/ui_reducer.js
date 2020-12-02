import { combineReducers } from 'redux';

export const context_act = {
  SONG_EDIT_C: "SONG_EDIT_C",
  SONG_BURGER_C: "SONG_BURGER_C",
  PLAYLIST_BURGER_C: "PLAYLIST_BURGER_C",
  CLOSE_CONTEXT: "CLOSE_CONTEXT",
  SELECT_PLAYLIST_C: "SELECT_PLAYLIST_C",
  PLAYLIST_EDIT_C: "PLAYLIST_EDIT_C",
  NEW_PLAYLIST: 'NEW_PLAYLIST',
  UPLOAD_SONGS: 'UPLOAD_SONGS'
}
const contextMenu = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case context_act.SONG_BURGER_C:
      return action
    case context_act.PLAYLIST_BURGER_C:
      return action
    case context_act.NEW_PLAYLIST:
      return action
    case context_act.UPLOAD_SONGS:
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

export default combineReducers({
  contextMenu
});
