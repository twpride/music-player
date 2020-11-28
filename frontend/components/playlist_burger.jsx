import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';


import styled from 'styled-components'
import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import editIcon from '../icons/edit.svg'
import addToPlaylist from '../icons/addToPlaylist.svg'
import deleteIcon from '../icons/delete.svg'
import {deletePlaylist, deleteSong} from '../util/api_util'
import {BurgerDiv} from './contextMenu'

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


export default function PlaylistBurger(props) {

  const dispatch = useDispatch();
  const contextMenu = useSelector(state => state.ui.contextMenu)
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)

  const burgerList = {
    "Rename playlist": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.PLAYLIST_EDIT_C })
    },
    // "Add to playlist": (e) => {
    //   e.stopPropagation()
    // },
    // "Remove from playlist": (e) => {
    //   e.stopPropagation()
    // },
    "Delete Playlist": (e) => {
      e.stopPropagation()
      deletePlaylist(contextMenu.playlist_id)
      dispatch({ type: ent_act.DELETE_PLAYLIST, playlist_id: contextMenu.playlist_id})
      dispatch({ type: context_act.CLOSE_CONTEXT })
    },
  }
  const icons = [
    editIcon, 
    // addToPlaylist,
    deleteIcon,
    // deleteIcon
  ]

  return (
    <BurgerDiv>
      <div className='song-info'>
        <div>{titleD[contextMenu.playlist_id] && titleD[contextMenu.playlist_id].title}</div>
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