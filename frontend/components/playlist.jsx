
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components'

import { getSongUrl, getPlaylist } from '../actions/actions'
import { moveTrack, deletePlaylist } from '../util/api_util'
// import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import update from 'immutability-helper'
import { Card } from './card'

import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { ent_act } from '../reducers/root_reducer'
import Header from './header'
import { useHistory } from 'react-router-dom'



export default function Playlist() {
  const history = useHistory();
  let { playlist_id } = useParams();

  const dispatch = useDispatch();

  const playSong = (song_id, track_no) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (document.getSelection().type === 'Range') return;
    dispatch({ type: ent_act.LOAD_TRACK, track: [playlist_id, track_no] })
    dispatch(getSongUrl(song_id))
    dispatch({ type: ent_act.SET_PLAY })
  }

  const playlistD = useSelector(state => state.entities.playlistD)
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)
  const songD = useSelector(state => state.entities.songD)
  const [cards, setCards] = useState(null)

  useEffect(() => {
    dispatch(getPlaylist(playlist_id))
  }, [])
  useEffect(() => {
    // if (!playlist) {
    //   dispatch(getPlaylist(playlist_id))
    // } else if (!cards) {
    //   setCards([...playlist])
    // }
    if (playlistD[playlist_id]) {
      setCards([...playlistD[playlist_id]])
    }
  }, [playlistD])

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

  const setPrev = (start, index) => {
    const req = {}

    const dir = index - start
    if (dir > 0) {
      if (start > 0) {
        req[cards[start][1]] = cards[start - 1][1]
      } else if (start === 0) {
        req[cards[start][1]] = null
      }
    } else if (dir < 0) {
      if (start + 1 < cards.length) {
        req[cards[start + 1][1]] = cards[start][1]
      } else {
        req['tail'] = [playlist_id, cards[start][1]]
      }
    }

    if (index > 0) {
      req[cards[index][1]] = cards[index - 1][1]
    } else if (index === 0) {
      req[cards[index][1]] = null
    }


    if (index + 1 < cards.length) {
      req[cards[index + 1][1]] = cards[index][1]
    } else {
      req['tail'] = [playlist_id, cards[index][1]]
    }

    moveTrack(req) // update db
    dispatch({ type: ent_act.RECEIVE_PLAYLIST, playlist_id, playlist: cards }) // update store

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
      <Header title={titleD && titleD[playlist_id].title} />

      <div className="scrollable">
        <DndProvider backend={TouchBackend}
          options={{ enableMouseEvents: true }}
        >
          {cards && cards.map(([song_id, entry_id, prev], index) => (
            <Card
              song_id={song_id}
              key={entry_id} // for react internal diff 
              index={index} // for current list order
              id={entry_id} // entry id
              playlist_id={playlist_id} // playlist id
              text={songD[song_id]} // title and name text
              moveCard={moveCard}
              setPrev={setPrev}
              playSong={playSong(song_id, index)}
            />
          ))}
        </DndProvider>
      </div>
    </>
  )
};












