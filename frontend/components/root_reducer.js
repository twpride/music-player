import { combineReducers } from 'redux';

// import entities from '../reducers/entities_reducer';
import session from '../reducers/session_reducer';
import errors from '../reducers/errors_reducer';
import ui from '../reducers/ui_reducer';


import users from '../reducers/users_reducer';
import menu from '../reducers/menu_reducer';

import {
  RECEIVE_SONG,
  RECEIVE_SONGS,
} from './actions';

const songs = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
      return { ...state, [action.song.id]: action.song};
    case RECEIVE_SONGS:
      return action.songs;
    default:
      return state;
  }
};


const entities = combineReducers({
  users,
  menu,
  songs
});

const rootReducer = combineReducers({
  entities,
  session,
  errors,
  ui,
});

export default rootReducer;
