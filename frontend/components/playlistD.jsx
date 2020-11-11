
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';

import { createPlaylist, getPlaylistTitleD } from './actions'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'


export default function PlaylistD() {
  let { id } = useParams();

  const dispatch = useDispatch();

  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)

  useEffect(() => {
    if (!titleD) {
      dispatch(getPlaylistTitleD())
    }
  }, [])

  // useEffect(() => {
  //   if (titleD) { setCards([...titleD]) }
  // }, [titleD])

  return (

    <div>
      <div onClick={() => dispatch(createPlaylist())}> New Playlist</div>
      {titleD && titleD.map((pl, index) => (
        <Link to={`/playlist_D/${pl.id}`}>
          {pl.title}
        </Link>
      ))}
    </div>
  )
};












