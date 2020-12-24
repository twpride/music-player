import React, { } from 'react';
import styled from 'styled-components'
import SongEditForm from './song_edit_form';
import PlaylistEditForm from './playlist_edit_form';
import SongBurger from './song_burger';
import PlaylistBurger from './playlist_burger';
import SelectPlaylist from './select_playlist';
import { useDispatch, useSelector } from 'react-redux'
import { context_act } from '../reducers/ui_reducer'
import NewPlaylist from './new_playlist';

const ModalDiv = styled.div`
  position: absolute;
  height: 100%;
  width:100%;
  z-index: 20;
  background-color: rgba(0,0,0,0.5);
`

export const ContextFormWrap = styled.div`
  position:absolute;
  left:0;
  right: 0;
  bottom:0;
  padding: 1.5em;
  background-color:white;
  .field {
    font-size: .7em;
    color: gray;
  }
  .field:first-letter {
    text-transform: capitalize;
  }

  input[type=text] {
    margin-bottom: 1em;
    width:100%;
  }

  .spacer {
    height: 1em;
  }

  .button-box {
    display:flex;
    justify-content: flex-end;
  }

  .title {
    font-weight:700;
  }

  input[type=submit], button{
    margin-left:3em;
  }

`

export const BurgerDiv = styled.div`
  position:absolute;
  left:0;
  right: 0;
  bottom:0;
  background-color:white;
  .burger-text {
    display: flex;
    margin-left:1em;
    align-items: center;
    justify-content: center;
  }
  .burger-row {
    padding: 1em 1em;
    display:flex;
    flex-direction: row;
    width:100%;
  }
  .burger-row:hover{
    background-color: #F0F0F0; 
  }
  
  img {
    height:24px;
    width:24px;
  }

  .context-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    border-bottom: 1px lightgrey solid;
    font-size:.9em;
    padding: 1em 1em;
  }
`

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
    case context_act.NEW_PLAYLIST:
      Component = NewPlaylist;
      break;
    default:
      return null;
  }
  return <ModalDiv onClick={() => dispatch({ type: context_act.CLOSE_CONTEXT })}>
    <Component />
  </ModalDiv>
}