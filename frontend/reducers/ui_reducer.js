import { combineReducers } from 'redux';

export const modal_act = {
  NEW_PLAYLIST: 'NEW_PLAYLIST',
  CLOSE_MODAL: 'CLOSE_MODAL'
}
const modal = (state = null, action) => {
  Object.freeze(state);
  const type = modal_act[action.type];
  if (type) {
    if (type === modal_act.CLOSE_MODAL) return null
    else return action;
  } else {
    return state
  }
};

export const context_act = {
  SONG_EDIT_C: "SONG_EDIT_C",
  SONG_BURGER_C: "SONG_BURGER_C",
  CLOSE_CONTEXT: "CLOSE_CONTEXT",
  SELECT_PLAYLIST_C: "SELECT_PLAYLIST_C",
}
const contextMenu = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case context_act.SONG_EDIT_C:
      return {...state, type:action.type}
    case context_act.SONG_BURGER_C:
      return action
    case context_act.CLOSE_CONTEXT:
      return null
    case context_act.SELECT_PLAYLIST_C:
      return {...state, type:action.type}
    default:
      return state;
  }
};


export default combineReducers({
  modal,
  contextMenu
});
