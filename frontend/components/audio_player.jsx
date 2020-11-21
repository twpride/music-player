import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

import { getSongD, getPlaylistTitleD } from '../util/api_util'
import { ent_act } from "../reducers/root_reducer"
import { getSongUrl } from '../actions/actions'
const PlayerDiv = styled.div`

`

const Slider = styled.input`
input[type='range'] {
  -webkit-appearance: none;
  background-color: #ddd;
  height: 20px;
  overflow: hidden;
  width: 400px;
}

input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 20px;
}


  &[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 2px;
    width: 2px;
    background: pink;
    margin-top: -5px;
    border-radius: 50%;
  }
  &:hover {
    &[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 15px;
      width: 15px;
      background: pink;
      margin-top: -5px;
      border-radius: 50%;
    }
  }  




  &[type="range"]::-moz-range-progress {
    background: tomato;
    height: 2px;
  }


  &[type="range"]::-moz-range-thumb {
    height: 0px;
    width: 0px;
    background: pink;
    margin-top: -5px;
    border-radius: 50%;
  }

  &:active:hover {
    &[type="range"]::-moz-range-thumb {
      height: 10px;
      width: 10px;
      background: pink;
      margin-top: -5px;
      border-radius: 50%;
    }
  }  
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
  const [time, setTime] = useState(50)
  const handleProgress = (e) => {
    setTime(e.target.value)
  }

  return (
    <PlayerDiv>

      <audio controls src={songUrl} onEnded={playNext} autoPlay />
      <Slider type="range" min="0" max="200" value={time} step="1" onChange={handleProgress} />
    </PlayerDiv>
  )
};
