import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

import { ent_act } from "../reducers/root_reducer"
import { getSongUrl } from '../actions/actions'

import next from '../icons/next.svg'; import play from '../icons/play.svg';
import pause from '../icons/pause.svg'; import prev from '../icons/prev.svg';
import volume from '../icons/volume.svg'; import queue from '../icons/queue.svg';

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 20px;
  cursor: pointer;
  .track-elapsed {
    height: 2px;
    background-color: #CE1141;
  }
  .track-remaining {
    height: 2px;
    background-color: grey;
  }
  .thumb-container {
    height: 100%;
    width:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index:10;
  }
  .thumb {
    /* display: none; */
    border-radius: 50%;
    background-color: rgb(173, 15, 55);
    width: 10px;
    height: 10px;
  }
`
const ControlDiv = styled.div``


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
   const [playing, setPlaying] = useState(false)
  const currentProgress = 30;
  return (
    <>

      <ProgressBar>
        <div className='track-elapsed' style={{ width: `${currentProgress}%` }}></div>
        <div className='thumb-container' >
          <div className='thumb'></div>
        </div>
        <div className='track-remaining' style={{ width: `${100 - currentProgress}%` }}></div>
      </ProgressBar>
      <ControlDiv>
        <img src={prev} />
        {playing ? <img src={pause} /> : <img src={play} />}
        <img src={next} />
      </ControlDiv>

      <img src={volume} />
      <img src={queue} />
      <audio
        autoPlay src={songUrl}
        onEnded={playNext}
      />

    </>
  )
};
