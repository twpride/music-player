
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';

import { moveTrack, getPlaylist } from '../util/api_util'
import { useParams } from 'react-router-dom'
import update from 'immutability-helper'
import { Card } from './card'

import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { ent_act } from '../reducers/root_reducer'

export default function Playlist() {
  const [cards, setCards] = useState(null)

  const dispatch = useDispatch();
  const track = useSelector(state => state.player.track);
  const playlistD = useSelector(state => state.entities.playlistD)
  const songD = useSelector(state => state.entities.songD)

  let { playlist_id } = useParams();

  if (!playlist_id) playlist_id = "songs_playlist"

  const playSong = (track_no) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (document.getSelection().type === 'Range') return;
    dispatch({ type: ent_act.LOAD_TRACK, track: [playlist_id, track_no] })
    dispatch({ type: ent_act.SET_PLAY })
  }


  useEffect(() => {

    const fetchPlaylist = async () => {
      if (playlist_id[0] == 's') return;
      const response = await getPlaylist(playlist_id)
      const playlist = await response.json()
      dispatch({ type: ent_act.RECEIVE_PLAYLIST, playlist_id, playlist })
    }

    if (!playlistD[playlist_id]) {
      fetchPlaylist()
    } else {
      setCards([...playlistD[playlist_id]])
    }

    return () => { playlist_id = null } // need to explain why this line is necessary
  }, [playlist_id])

  useEffect(() => {
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
    }
    , [cards],
  )

  const setPrev = useCallback(
    (start, index) => {

      moveTrack([start + 1, index + 1, playlist_id]) // update db
      dispatch({ type: ent_act.RECEIVE_PLAYLIST, playlist_id, playlist: cards }) // update store

      if (track && track[0] == playlist_id) {
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
      }
    }, [cards])


  return (

    <div className="scrollable">
      <DndProvider backend={TouchBackend}
        options={{ enableMouseEvents: true }}
      >
        {cards && cards.map(([song_id, entry_id], index) => (
          <Card
            song_id={song_id}
            key={entry_id ? entry_id:song_id} // for react internal diff 
            index={index} // for current list order
            id={entry_id} // entry id
            playlist_id={playlist_id} // playlist id
            text={songD[song_id]} // title and name text
            moveCard={moveCard}
            setPrev={setPrev}
            playSong={playSong(index)}
          />
        ))}
      </DndProvider>
    </div>
  )
};












