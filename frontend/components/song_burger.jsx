import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';


import styled from 'styled-components'
import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import editIcon from '../icons/edit.svg'
import addToPlaylist from '../icons/addToPlaylist.svg'
import deleteIcon from '../icons/delete.svg'
import {deleteTrack, deleteSong} from '../util/api_util'
import {BurgerDiv} from './contextMenu'

const PlaylistBurger = styled(props => <BurgerDiv {...props} />)` 
  .song-info {
    div:nth-child(1) {
      color: #777777;
    }
  }
`;


export default function SongBurger() {

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
      deleteSong(contextMenu.song_id)
      dispatch({ type: context_act.CLOSE_CONTEXT })
    },
  }
  const icons = [
    editIcon, addToPlaylist, deleteIcon, deleteIcon
  ]

  if (!contextMenu.playlist_id) {
    delete burgerList['Remove from playlist'];
    icons.splice(2,1);
  }

  return (
    <PlaylistBurger>
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
    </PlaylistBurger>
  );
}