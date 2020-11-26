import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';


import styled from 'styled-components'
import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import editIcon from '../icons/edit.svg'
import addToPlaylist from '../icons/addToPlaylist.svg'
import deleteIcon from '../icons/delete.svg'
import {deleteTrack, deleteSong} from '../util/api_util'

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
export default function SongBurger(props) {

  const dispatch = useDispatch();
  const songD = useSelector(state => state.entities.songD)
  const contextMenu = useSelector(state => state.ui.contextMenu)
  const playlistD = useSelector(state => state.entities.playlistD)

  const burgerList = {
    "Edit song": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.SONG_EDIT_C })
    },
    "Add to playlist": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.SELECT_PLAYLIST_C, id: contextMenu.song_id })
    },
    "Remove from playlist": (e) => {
      e.stopPropagation()
      // Each row in playlist is Entry instance, Entry schema "song_id", "Entry_pk","prev_id"
      const playlist = playlistD[contextMenu.playlist_id]
      const req = {target:playlist[contextMenu.index][1]}
      if (contextMenu.index != playlist.length - 1) {
        req['prev'] = playlist[contextMenu.index][2]
        req['next'] = playlist[contextMenu.index + 1][1]
      }

      deleteTrack(req)

      dispatch({ type: ent_act.REMOVE_FROM_PLAYLIST, idx:contextMenu.index, pl_id: contextMenu.playlist_id })
    },
    "Delete song": (e) => {
      e.stopPropagation()
      // console.log(3)
      deleteSong(contextMenu.song_id)
    },
  }
  const icons = [
    editIcon, addToPlaylist, deleteIcon, deleteIcon
  ]

  return (
    <BurgerDiv>
      <div className='song-info'>
        <div>{songD[contextMenu.song_id].artist}</div>
        <div>{songD[contextMenu.song_id].title}</div>
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