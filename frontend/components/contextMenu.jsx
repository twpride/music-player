import React, { useEffect } from 'react';
import styled from 'styled-components'
import SongEditForm from './song_edit_form';
import PlaylistEditForm from './playlist_edit_form';
import SongBurger from './song_burger';
import PlaylistBurger from './playlist_burger';
import SelectPlaylist from './select_playlist';
import UploadForm  from './upload_form'
import { useDispatch, useSelector } from 'react-redux'
import { context_act } from '../reducers/ui_reducer'
import NewPlaylist from './new_playlist';

const ModalDiv = styled.div`
  position: absolute;
  height: 100%;
  width:100%;
  z-index: 20;
  padding:1em;
  background-color: rgba(0,0,0,0.5);

  /* .title {
    font-size: 1em;
    font-weight: 600;
  } */
`

export const ContextFormWrap = styled.div`
  position:absolute;
  left:0;
  right: 0;
  bottom:0;
  padding: 1.5em;
  background-color:white;
  .field {
    text-transform: capitalize;
    font-size: .7em;
    color: gray;
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
    /* justify-content: enter; */
    margin-left:1em;
    align-items: center;
  }
  .burger-row {
    padding: 1em 1em;
    /* height:4em; */
    display:flex;
    flex-direction: row;
    width:100%;
  }
  .burger-row:hover{
    background-color: #F0F0F0; 
  }
  .song-info {
    display: flex;
    flex-direction: column;
    /* align-items: center */
    font-size:.9em;
    padding: 1em 1em;
    border-bottom: 1px lightgrey solid;
  }
  
  img {
    height:24px;
    width:24px;
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
    case context_act.UPLOAD_SONGS:
      Component = UploadForm;
      break;
    default:
      return null;
  }
  return <ModalDiv onClick={() => dispatch({ type: context_act.CLOSE_CONTEXT })}>
    <Component />
  </ModalDiv>
}