import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ent_act } from "../reducers/root_reducer"
import { getSongUrl } from '../actions/actions'

import playIcon from '../icons/play.svg';
import pauseIcon from '../icons/pause.svg';
import prev from '../icons/prev.svg';
import next from '../icons/next.svg';


const convertSecsToMins = seconds => {
  let mins = Math.floor(seconds / 60).toString();
  let secs = Math.floor(seconds % 60);
  secs = (secs < 10 ? '0' + secs.toString() : secs.toString());
  return `${mins}:${secs}`
}

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2px;
  min-height: 30px;
  position:absolute;
  top:-15px;
  z-index:10;
  overflow-x:hidden;
  cursor: pointer;
  .track-elapsed {
    height: 2px;
    background-color: #ad0f37;
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
    background-color: #ad0f37;
    width: 10px;
    height: 10px;
  }

`
const PlayerDiv = styled.div`
  height:60px;
  min-height:60px;
  position: relative;
`

const SwipeDiv = styled.div`
  display:flex;
  align-items:center;
  height:100%;
  .control {
    display:flex;
    align-items:center;
    margin:0 6px;
    cursor: pointer;
    .play-button {
      height: 32px;
      width: 32px;
      margin:0 6px;
    }
    .skip-button {
      height: 24px;
      width: 24px;
      margin:0 6px;
    }
  }
  .song-info {
    margin-left:19px;
    margin-right:19px;
    font-size:.9em;
    overflow:hidden;
    white-space: nowrap;
    div:nth-of-type(1) {
      color: #777777;
    }
  }
  .time-info {
    font-size:.7em;
  }
  .noselect{
    user-select: none;  
    -webkit-user-select: none; 
    -moz-user-select: none; 
  }

`

export default function AudioPlayer({ winWidth }) {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(0);
  const [down, setDown] = useState(false);
  const [songInfo, setSongInfo] = useState(null);
  const [start, setStart] = useState(null)
  const [curSongId, setCurSongId] = useState(null)

  const songUrl = useSelector(state => state.player.songUrl);
  const playlistD = useSelector(state => state.entities.playlistD);
  const songD = useSelector(state => state.entities.songD);
  const track = useSelector(state => state.player.track);
  const playing = useSelector(state => state.player.playing);

  const aud = useRef()
  const playerdiv = useRef(null)
  const history = useHistory();

  useEffect(() => {
    window.aud = aud.current;

    aud.current.addEventListener('loadedmetadata', handleLoadedMeta);
    document.addEventListener('keydown', handleSpace)
    return () => {
      aud.current.removeEventListener('loadedmetadata', handleLoadedMeta)
      document.removeEventListener('keydown', handleSpace)
    }
  }, [])

  useEffect(() => {
    playerdiv.current.addEventListener("touchend", handleSwipeEnd);
    return () => {
      playerdiv.current.removeEventListener("touchend", handleSwipeEnd);
    };
  }, [start]);

  useEffect(() => {
    let title = '';
    let artist = '';
    if (track) {
      let song;
      if (track[0]) {song = songD[playlistD[track[0]][track[1]][0]];}
      else {song = Object.values(songD)[track[1]];}
      artist = song.artist;
      title = song.title;
      setSongInfo(song)
    }

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({ title, artist });
      navigator.mediaSession.setActionHandler('previoustrack', skip(-1));
      navigator.mediaSession.setActionHandler('nexttrack', skip(1));
    }

  }, [track, playlistD]) // remount when new track or when playlist is modified (eg when new song added)

  useEffect(() => {
    if (track && playing) {
      let song_id;
      if (track[0]) { song_id = playlistD[track[0]][track[1]][0]; }
      else { song_id = Object.values(songD)[track[1]].id; }
      if (curSongId != song_id) {
        dispatch(getSongUrl(song_id));
        setCurSongId(song_id);
      } else { aud.current.play(); }
    }
  }, [track, playing])

  const skip = (dir) => () => {
    if (!track) return
    const newtr = [...track];
    newtr[1] += dir;
    let song;
    if (
      newtr[0] &&
      (playlistD[newtr[0]][newtr[1]])
    ) {
      song = playlistD[newtr[0]][newtr[1]]
      dispatch(getSongUrl(song[0]));
      dispatch({ type: ent_act.LOAD_TRACK, track: newtr });
    } else if (
      !newtr[0] &&
      (song = Object.values(songD)[newtr[1]])
    ) {
      dispatch(getSongUrl(song.id));
      dispatch({ type: ent_act.LOAD_TRACK, track: newtr });
    }
    dispatch({ type: ent_act.SET_PLAY })
  };

  function handleLoadedMeta(e) {
    let sec;
    // webkit audio doubles song duration with silent second half
    if (window.webkitAudioContext) { sec = e.target.duration / 2; }
    else { sec = e.target.duration; }
    setDuration([sec, convertSecsToMins(sec)])
  }

  function handleSpace(e) {
    if (e.target.type && e.target.type.slice(0, 4) === 'text') return;
    if (e.key === " ") {
      e.preventDefault()
      onPlayClick()
    }
  }

  function handleTimeUpdate(e) {
    const prog = e.target.currentTime / duration[0];
    if (window.webkitAudioContext && prog >= 1) { skip(1)(); } //for webkit
    if (!down) { setProgress(prog); }
  }

  const handleMouseUp = (e) => {
    e.stopPropagation()
    const prog = e.clientX / winWidth;
    setProgress(prog);
    aud.current.currentTime = prog * duration[0];
    setDown(false);
    document.removeEventListener('mousemove', updateDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation()
    const prog = e.changedTouches[0].clientX / winWidth;
    setProgress(prog);
    aud.current.currentTime = prog * duration[0];
    setDown(false);
    document.removeEventListener('touchmove', updateDrag);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const updateDrag = (e) => {
    let prog;
    if (!e.clientX) { prog = e.touches[0].clientX / winWidth; }
    else { prog = e.clientX / winWidth; }
    setProgress(prog);
  };

  const ProgressBarHandler = {
    onMouseDown: (e) => {
      if (!e.clientX) return;
      e.stopPropagation()
      if (!duration) return;
      setProgress(e.clientX / winWidth);
      setDown(true);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', updateDrag);
    },
    onTouchStart: (e) => {
      e.stopPropagation()
      if (!duration) return;
      setProgress(e.touches[0].clientX / winWidth);
      setDown(true);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchmove', updateDrag);
    },
  }

  const handleSwipeStart = e => {
    setStart(e.touches[0].clientX)
  }

  const handleSwipeEnd = e => {
    const dir = e.changedTouches[0].clientX - start;
    setStart(null)
    if (Math.abs(dir) < 100) {
      const pl_id = track[0]
      if (pl_id) history.push(`/playlist_D/${pl_id}`)
      else history.push('')
    } else if (dir > 0) skip(-1)()
    else skip(1)()
  }
  function handleTitleClick(e) {
    const pl_id = track[0]
    console.log(pl_id)
    if (pl_id) { history.push(`/playlist_D/${pl_id}`); }
    else { history.push(''); }
  }

  function onPlayClick() {
    if (!aud.current.paused) {
      aud.current.pause();
      dispatch({ type: ent_act.SET_PAUSE })
    } else if (!aud.current.emptied) {
      dispatch({ type: ent_act.SET_PLAY });
    }
  }


  return <>
    <PlayerDiv >
      <ProgressBar {...ProgressBarHandler}>
        <div className='track-elapsed' style={{ width: `${progress * 100}%` }} />
        <div className='thumb-container' >
          <div className='thumb' />
        </div>
        <div className='track-remaining' style={{ width: `${100 - progress * 100}%` }} />
      </ProgressBar>
      <SwipeDiv ref={playerdiv} onTouchStart={handleSwipeStart} onMouseDown={handleTitleClick}>
        <div className='control'
          onTouchStart={(e) => {
            e.stopPropagation()
          }}
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
        >
          {winWidth > 500 && <img src={prev} onClick={skip(-1)} className='skip-button' />}
          <img src={playing ? pauseIcon : playIcon} className='play-button'
            onClick={onPlayClick}
            onTouchStart={(e) => {
              e.stopPropagation()
            }}
          />
          {winWidth > 500 && <img src={next} onClick={skip(1)} className='skip-button' />}
        </div>

        {duration &&
          <div className='time-info'>
            {`${convertSecsToMins(progress * duration[0])}`}/{duration[1]}
          </div>
        }
        <div className='song-info noselect'>
          <div>{songInfo && songInfo.artist}</div>
          <div>{songInfo && songInfo.title}</div>
        </div>
      </SwipeDiv>
    </PlayerDiv>
    <audio
      // controls
      id='audio'
      ref={aud}
      crossOrigin="anonymous"
      autoPlay
      src={songUrl}
      onEnded={skip(1)}
      onTimeUpdate={handleTimeUpdate}
    />
  </>
}
