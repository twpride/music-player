import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

import { ent_act } from "../reducers/root_reducer"
import { getSongUrl } from '../actions/actions'

import next from '../icons/next.svg'; import play from '../icons/play.svg';
import pause from '../icons/pause.svg'; import prev from '../icons/prev.svg';
import volume from '../icons/volume.svg'; import queue from '../icons/queue.svg';

const ProgressBar = styled.div`
  /* box-sizing:content-box; */
  display: flex;
  align-items: center;
  width: 100%;
  height: 2px;
  min-height: 30px;
  background-color: rgba(255,255,255,0);
  position:absolute;
  top:-15px;
  z-index:10;

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
    z-index:5;
  }
  .thumb {
    /* display: none; */
    border-radius: 50%;
    background-color: rgb(173, 15, 55);
    width: 10px;
    height: 10px;
  }

`
const PlayerDiv = styled.div`
  height:60px;
  min-height:60px;

  display:flex;
  align-items:center;
  justify-content: space-between;
  position: relative;
  .control {
    div {
      width:5px;
    }
    display:flex;
    align-items:center;
    img {
      height: 20px;
      width: 20spx;
    }
    img:nth-of-type(1) {
      height: 30px;
      width: 30px;
      margin:0 10px 0 10px;
    }
  }
  .song-info {
    font-size:.9em;
    overflow:hidden;
    white-space: nowrap
  }
  div:last-child{
    display:flex;
    >img {
      height: 26px;
      width: 26px;
    }
    div {
      width:10px;
    }
  }
`


export default function AudioPlayer() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.aud = document.querySelector('audio')
  }, [])

  const songUrl = useSelector(state => state.player.songUrl)
  const playlist_dir = useSelector(state => state.entities.playlistD)
  const songD = useSelector(state => state.entities.songD)
  const playlistD = useSelector(state => state.entities.playlistD)
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

      <PlayerDiv>
        <ProgressBar>
          <div className='track-elapsed' style={{ width: `${currentProgress}%` }}></div>
          <div className='thumb-container' >
            <div className='thumb'></div>
          </div>
          <div className='track-remaining' style={{ width: `${100 - currentProgress}%` }}></div>
        </ProgressBar>

        <div className='control'>
          {/* <div></div> */}
          {/* <img src={prev} /> */}
          {playing ? <img src={pause} /> : <img src={play} />}
          {/* <img src={next} /> */}
        </div>
        <div className='song-info'>
          <div>{track && songD[playlistD[track[0]][track[1]][0]].artist}&nbsp;</div>
          <div>{track && songD[playlistD[track[0]][track[1]][0]].title}&nbsp;</div>
        </div>
        <div>
          <img src={volume} />
          <div></div>
          <img src={queue} />
        </div>
      </PlayerDiv>

      <audio
        autoPlay src={songUrl}
        onEnded={playNext}
      />

    </>
  )
};
