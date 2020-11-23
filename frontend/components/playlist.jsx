
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';

import { getSongUrl, getPlaylist } from '../actions/actions'
import { moveTrack } from '../util/api_util'
// import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import update from 'immutability-helper'
import { Card } from './card'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { ent_act } from '../reducers/root_reducer'
import Header from './header'

export default function Playlist() {
  let { id } = useParams();

  const dispatch = useDispatch();

  const playSong = (song_id, track_no) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: ent_act.LOAD_TRACK, track: [id, track_no] })
    dispatch(getSongUrl(song_id))
  }

  const playlist = useSelector(state => state.entities.playlistD[id])
  const songD = useSelector(state => state.entities.songD)
  const [cards, setCards] = useState(null)
  
  useEffect(() => {
    if (!playlist) {
      dispatch(getPlaylist(id))
    } else if (!cards) {
      setCards([...playlist])
    }
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

  const track = useSelector(state => state.player.track);
  
  const [draggable, setDraggable] = useState(true)
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
      req[cards[index + 1][1]] = cards[index][1]
    }

    moveTrack(req) // update db
    dispatch({ type: ent_act.RECEIVE_PLAYLIST, id, playlist: cards }) // update store

    if (!track) return;
    const tr = track[1];
    let newtr = [...track];
    if (tr == start) {
      newtr[1] = index;
    } else if (start < tr && index >= tr) {
      newtr[1] -= 1;
    } else if (start > tr && index <= tr) {
      newtr[1] += 1;
    }
    dispatch({ type: ent_act.LOAD_TRACK, track: newtr })
  };

  return (

    <>
      <Header action={setDraggable} state={draggable}/>
      <div className="scrollable">
        <DndProvider backend={TouchBackend} 
        options={{enableMouseEvents:true}}
        >
          {cards && cards.map(([song_id, entry_id, prev], index) => (
            <Card
              song_id={song_id}
              key={entry_id}
              index={index}
              id={entry_id}
              text={songD[song_id]}
              moveCard={moveCard}
              setPrev={setPrev}
              playSong={playSong(song_id, index)}
              draggable={draggable}
            />
          ))}
        </DndProvider>
      </div>
    </>
  )
};












