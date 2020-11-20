
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';

import { createPlaylist, getPlaylistTitleD } from '../actions/actions'
import { modal_act} from '../reducers/ui_reducer'

import { Link } from 'react-router-dom'


export default function PlaylistD() {

  const dispatch = useDispatch();

  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)

  useEffect(() => {
    if (!titleD) {
      dispatch(getPlaylistTitleD())
    }
  }, [])

  return (

    <div>
      <div onClick={() => dispatch({type:modal_act.NEW_PLAYLIST})}> New Playlist</div>
      {titleD && titleD.map((pl, index) => (
        <Link key={index} to={`/playlist_D/${pl.id}`}>
          {pl.title}
        </Link>
      ))}
    </div>
  )
};












