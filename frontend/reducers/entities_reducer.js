import { combineReducers } from 'redux';

import users from './users_reducer';
import menu from './menu_reducer';
export default combineReducers({
  users,
  menu
});
