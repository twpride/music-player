import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

import { ent_act } from "../reducers/root_reducer"
import { getSongUrl } from '../actions/actions'

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 50px;
  .track-total {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1px;
    padding: 11.5px 0;
    z-index: 1;
    cursor: pointer;
  }
  .track-elapsed {
    height: 1px;
    align-self: flex-start;
    background-color: #CE1141;
  }
  .track-remaining {
    height: 1px;
    align-self: flex-start;
    background-color: grey;
  }
  .thumb-container {
    width: auto;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .thumb {
    // display: none;
    border-radius: 50%;
    background-color: rgb(173, 15, 55);
    width: 9px;
    height: 9px;
    margin-top: 0.8px;
  }
`


export default function AudioPlayer() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.aud = document.querySelector('audio')
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

  function handleTimeUpdate(e) {
    const globalAudioTime = e.target.currentTime;
    if (!this.state.down) {
      this.setState({ currentProgress: (globalAudioTime / audio.currentSong.duration) * 100 }, () => {
        this.updateTime(globalAudioTime);
      })
    } else {
      this.updateTime(globalAudioTime)
    }
  }

  const currentProgress = 50;
  return (
    <>

      <ProgressBar>
        <div className='track-total'>
          <div className='track-elapsed' style={{ width: `${currentProgress}%` }}></div>
          <div className='thumb-container' >
            <div className='thumb'></div>
          </div>
          <div className='track-remaining' style={{ width: `${100 - currentProgress}%` }}></div>
        </div>
      </ProgressBar>

      <audio
        controls autoPlay src={songUrl}
        onEnded={playNext}
      />

    </>
  )
};
