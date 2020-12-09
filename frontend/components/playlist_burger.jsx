import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';

import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import editIcon from '../icons/edit.svg'
import deleteIcon from '../icons/delete.svg'
import { deletePlaylist } from '../util/api_util'
import { BurgerDiv } from './contextMenu'


export default function PlaylistBurger(props) {

  const dispatch = useDispatch();
  const contextMenu = useSelector(state => state.ui.contextMenu)
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)

  const burgerList = {
    "Rename playlist": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.PLAYLIST_EDIT_C })
    },

    "Delete Playlist": (e) => {
      e.stopPropagation()
      deletePlaylist(contextMenu.playlist_id)
      dispatch({ type: ent_act.DELETE_PLAYLIST, playlist_id: contextMenu.playlist_id })
      dispatch({ type: context_act.CLOSE_CONTEXT })
    },
  }
  const icons = [
    editIcon,
    deleteIcon,
  ]

  return (
    <BurgerDiv>
      <div className='song-info'>
        <div>{titleD[contextMenu.playlist_id] && titleD[contextMenu.playlist_id]}</div>
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