import React, { useEffect } from 'react';
import styled from 'styled-components'
import SongEditForm from './song_edit_form';
import PlaylistEditForm from './playlist_edit_form';
import SongBurger from './song_burger';
import PlaylistBurger from './playlist_burger';
import SelectPlaylist from './select_playlist';
import { useDispatch, useSelector } from 'react-redux'



import { context_act } from '../reducers/ui_reducer'
import { ModalDiv } from './modal'

export default function ContextMenu() {
  const dispatch = useDispatch()

  const contextMenu = useSelector(state => state.ui.contextMenu);
  if (!contextMenu) {
    return null;
  }
  let Component;
  switch (contextMenu.type) {
    case context_act.SONG_BURGER_C:
      Component = SongBurger;
      break;
    case context_act.SONG_EDIT_C:
      Component = SongEditForm;
      break;
    case context_act.PLAYLIST_BURGER_C:
      Component = PlaylistBurger;
      break;
    case context_act.PLAYLIST_EDIT_C:
      Component = PlaylistEditForm;
      break;
    case context_act.SELECT_PLAYLIST_C:
      Component = SelectPlaylist;
      break;
    default:
      return null;
  }
  return <ModalDiv onClick={() => dispatch({ type: context_act.CLOSE_CONTEXT })}>
    <Component />
  </ModalDiv>
}