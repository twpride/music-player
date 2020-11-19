import { combineReducers } from 'redux';



import { OPEN_MODAL, CLOSE_MODAL, OPEN_CONTEXT_MENU, CLOSE_CONTEXT_MENU } from '../actions/ui_actions';



export const SONG_EDIT_C = "SONG_EDIT_C";
export const SONG_BURGER_C = "SONG_BURGER_C";

export const ui = {
  SONG_EDIT_C:"SONG_EDIT_C",
  SONG_BURGER_C: "SONG_BURGER_C",
  CLOSE_CONTEXT: "CLOSE_CONTEXT",
}

const modal = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};



const contextMenu = (state = null, action) => {
  Object.freeze(state);
  const uiType = ui[action.type];
  console.log(uiType, action.type)
  if (uiType) {
    if (uiType === ui.CLOSE_CONTEXT) return null
    else return action;
  } else {
    return state
  }
};




export default combineReducers({
  modal,
  contextMenu
});
