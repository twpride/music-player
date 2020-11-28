import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';


import styled from 'styled-components'
import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import editIcon from '../icons/edit.svg'
import addToPlaylist from '../icons/addToPlaylist.svg'
import deleteIcon from '../icons/delete.svg'
import {deletePlaylist, deleteSong} from '../util/api_util'

const renderErrors = () => {
  const errors = useSelector(state => state.errors);
  return (
    <>
      {errors.map((error, i) => (
        <div key={`error-${i}`} className="form-error">
          {error}
        </div>
      ))}
    </>
  );
}

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
    div:nth-child(1) {
      color: #777777;
    }
    border-bottom: 1px lightgrey solid;
  }

`
export default function PlaylistBurger(props) {

  const dispatch = useDispatch();
  const songD = useSelector(state => state.entities.songD)
  const contextMenu = useSelector(state => state.ui.contextMenu)
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)

  const burgerList = {
    "Rename Playlist": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.PLAYLIST_EDIT_C })
    },
    "Add to playlist": (e) => {
      e.stopPropagation()
    },
    "Remove from playlist": (e) => {
      e.stopPropagation()
    },
    "Delete Playlist": (e) => {
      e.stopPropagation()
      deletePlaylist(contextMenu.playlist_id)
      dispatch({ type: ent_act.DELETE_PLAYLIST, playlist_id: contextMenu.playlist_id})
    },
  }
  const icons = [
    editIcon, addToPlaylist, deleteIcon, deleteIcon
  ]

  return (
    <BurgerDiv>
      <div className='song-info'>
        <div>{titleD[contextMenu.playlist_id].title}</div>
      </div>
      {Object.entries(burgerList).map(([name, cb], i) => (
        <div key={i} onClick={cb} className="burger-row">
          <img src={icons[i]} />
          <div className="burger-text">
            {name}
          </div>
        </div>
      ))}
    </BurgerDiv>
  );
}