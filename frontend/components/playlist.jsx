
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';

import { getSongUrl, getPlaylist, receivePlaylist } from './actions'
import { moveTrack } from './api_util'
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
      setCards(
        update(cards,
          {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, cards[dragIndex]],
            ]
          }
        )
      )
    },
    [cards],
  )

  const setPrev = (start, index) => {
    const req = {}

    const dir = index - start
    if (dir > 0) {
      if (start > 0) {
        req[cards[start][1]] = cards[start - 1][1]
      } else if (start === 0) {
        req[cards[start][1]] = null
      }
    } else if (dir < 0 && start + 1 < cards.length) {
      req[cards[start + 1][1]] = cards[start][1]
    }

    if (index > 0) {
      req[cards[index][1]] = cards[index - 1][1]
    } else if (index === 0) {
      req[cards[index][1]] = null
    }

    if (index + 1 < cards.length) {
      req[cards[index+1][1]] = cards[index][1]
    }

    moveTrack(req)
    dispatch(receivePlaylist(id,cards))
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend} >
        {/* {playlist && playlist.map(([song, track, prev], index) => ( */}
        {cards && cards.map(([song, track, prev], index) => (
          <Card
            key={track}
            index={index}
            id={track}
            prev={prev}
            text={song}
            moveCard={moveCard}
            setPrev={setPrev}
          />
        ))}
      </DndProvider>
    </div>
  )
};












