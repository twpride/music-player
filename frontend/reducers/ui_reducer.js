import { combineReducers } from 'redux';



import { OPEN_MODAL, CLOSE_MODAL, OPEN_CONTEXT_MENU, CLOSE_CONTEXT_MENU } from '../actions/ui_actions';

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
  switch (action.type) {
    case OPEN_CONTEXT_MENU:
      delete action.type;
      return action;
    case CLOSE_CONTEXT_MENU:
      return null;
    default:
      return state;
  }
};



export default combineReducers({
  modal,
  contextMenu
});
