
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';

import { getSongUrl, getPlaylist } from './actions'
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

  const [cards, setCards] = useState([])

  useEffect(() => {
    if (!playlist) {
      dispatch(getPlaylist(id))
    }
  }, [])

  useEffect(() => {
    if (playlist) { setCards([...playlist]) }
  }, [playlist])


  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]

      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      )
      // dispatch([EDIT_ARC_PARAMS,
      //   {
      //     id: sel,
      //     field: "config",
      //     data: newdata
      //   }
      // ])
    },
    [cards, dispatch],
  )

  return (
    <div>
      <DndProvider backend={HTML5Backend} >
        {cards && cards.map(([song, track, next], index) => (
          <Card
            key={track}
            index={index}
            id={track}
            text={song}
            moveCard={moveCard}
          />
        ))}
      </DndProvider>
    </div>
  )
};












