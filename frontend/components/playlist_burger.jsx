import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';

import { context_act } from '../reducers/root_reducer'
import { ent_act } from '../reducers/root_reducer'
import { EditIcon, DeleteIcon} from './active_svgs'

import { deletePlaylist } from '../util/api_util'
import { BurgerDiv } from './contextMenu'


export default function PlaylistBurger() {

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
    EditIcon, DeleteIcon
  ]

  const burgerlistArray= Object.entries(burgerList);
  return (
    <BurgerDiv>
      <div className='context-header'>
        <div>{titleD[contextMenu.playlist_id] && titleD[contextMenu.playlist_id]}</div>
      </div>
      {icons.map((Icon, i) => (
        <div key={i} onClick={burgerlistArray[i][1]} className="row">
          <Icon {...{scale:1,size:"24px"}}/>
          <div className="burger-text">
            {burgerlistArray[i][0]}
          </div>
        </div>
      ))}
    </BurgerDiv>
  );
}