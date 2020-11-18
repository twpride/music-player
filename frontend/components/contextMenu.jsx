import React from 'react';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import User from './user';
// import './context_menu.css'
import SongEditForm from './song_edit_form';
import SongBurger from './song_burger';
import {useSelector} from 'react-redux'
 
export const SONG_EDIT_C = "SONG_EDIT_C";
export const SONG_BURGER_C = "SONG_BURGER_C";


export default function ContextMenu() {
  const contextMenu = useSelector(state => state.ui.contextMenu);
  if (!contextMenu) {
    return null;
  }
  let Component;
  switch (contextMenu.contextMenu) {
    case SONG_BURGER_C:
      Component = SongBurger;
      break;
    case SONG_EDIT_C:
      Component = SongEditForm;
      break;
    default:
      return null;
  }
  return <Component id={contextMenu.id} className="modalclass"/>
}