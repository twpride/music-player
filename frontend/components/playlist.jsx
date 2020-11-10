
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';

import { getSongUrl, getPlaylist, receivePlaylist } from './actions'
import { addToPlaylist } from './api_util'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import update from 'immutability-helper'
import { Card } from './card'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Playlist() {
  let { id } = useParams();

  const dispatch = useDispatch();

  const playSong = (e) => {
    dispatch(getSongUrl(e))
  }

  const playlist = useSelector(state => state.entities.playlists[id])

  useEffect(() => {
    if (!playlist) {
      dispatch(getPlaylist(id))
    }
  }, [])

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(
        receivePlaylist(
          id,
          update(playlist, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, playlist[dragIndex]],
            ],
          })
        )
      )
    },
    [playlist, dispatch],
  )

  return (
    <div>
      <DndProvider backend={HTML5Backend} >
        {playlist && playlist.map(([song, track, prev], index) => (
          <Card
            key={track}
            index={index}
            id={track}
            prev={prev}
            text={song}
            moveCard={moveCard}
          />
        ))}
      </DndProvider>
    </div>
  )
};












