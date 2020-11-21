import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

import { getSongD, getPlaylistTitleD } from '../util/api_util'
import { ent_act } from "../reducers/root_reducer"
import { getSongUrl } from '../actions/actions'
const PlayerDiv = styled.div`

`

export default function AudioPlayer() {
  const dispatch = useDispatch()

  useEffect(() => {
    getSongD()
      .then(response => response.json())
      .then(songD => dispatch({ type: ent_act.RECEIVE_SONG_D, songD }));

    getPlaylistTitleD()
      .then(response => response.json())
      .then(playlistTitleD => dispatch(
        { type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD }
      ));
  }, [])

  const songUrl = useSelector(state => state.player.songUrl)
  const playlist_dir = useSelector(state => state.entities.playlistD)
  const track = useSelector(state => state.player.track)

  const playNext = () => {
    const newtr = [...track]
    newtr[1] += 1
    let song_id
    if (song_id = playlist_dir[newtr[0]][newtr[1]]) {
      dispatch(getSongUrl(song_id[0]))
      dispatch({ type: ent_act.LOAD_TRACK, track: newtr })
    }
  }

  const playPrev = () => {
    const newtr = [...track]
    newtr[1] -= 1
    let song_id
    if (song_id = playlist_dir[newtr[0]][newtr[1]]) {
      dispatch(getSongUrl(song_id[0]))
      dispatch({ type: ent_act.LOAD_TRACK, track: newtr })
    }
  }
  return (
    <PlayerDiv>
      <audio controls src={songUrl} onEnded={playNext} autoPlay />
    </PlayerDiv>
  )
};
