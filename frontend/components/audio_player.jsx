import React, { useEffect, useState, useLayoutEffect, useRef, useCallback } from 'react';
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
    background-color: #ad0f37;
    width: 10px;
    height: 10px;
  }

`
const PlayerDiv = styled.div`
  height:60px;
  min-height:60px;
  display:flex;
  align-items:center;
  position: relative;

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
`


export default function AudioPlayer() {
  const dispatch = useDispatch();
  const [winWidth, setWinWidth] = useState(window.innerWidh);
  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(0);
  const [swipex, setSwipex] = useState(null);
  const [swipexEnd, setSwipexEnd] = useState(null);
  const [down, setDown] = useState(false);
  const [songInfo, setSongInfo] = useState(null);

  const songUrl = useSelector(state => state.player.songUrl);
  const playlist_dir = useSelector(state => state.entities.playlistD);
  const songD = useSelector(state => state.entities.songD);
  const playlistD = useSelector(state => state.entities.playlistD);
  const track = useSelector(state => state.player.track);
  const playing = useSelector(state => state.player.playing);

  const history = useHistory();

  const skip = (dir) => () => {
    if (!track) return
    const newtr = [...track];
    newtr[1] += dir;
    let song;
    if (
      newtr[0] &&
      (playlist_dir[newtr[0]][newtr[1]])
    ) {
      song = playlist_dir[newtr[0]][newtr[1]]
      dispatch(getSongUrl(song[0]));
      dispatch({ type: ent_act.LOAD_TRACK, track: newtr });
    } else if (
      !newtr[0] &&
      (song = Object.values(songD)[newtr[1]])
    ) {
      dispatch(getSongUrl(song.id));
      dispatch({ type: ent_act.LOAD_TRACK, track: newtr });
    }
  };


  function updateSize() {
    setWinWidth(window.innerWidth)
  }
  function handleLoadedMeta(e) {
    const sec = e.target.duration;
    setDuration([sec, convertSecsToMins(sec)])
  }
  function handleSpace(e) {
    if (e.target.type === 'text') return;
    if (e.key === " ") document.getElementsByClassName('play-button')[0].click()
  }
  useEffect(() => {
    const aud = document.querySelector('audio')
    window.aud = aud;

    aud.addEventListener('loadedmetadata', handleLoadedMeta);

    window.addEventListener('resize', updateSize)
    updateSize()

    document.addEventListener('keydown', handleSpace)

    return () => {
      aud.removeEventListener('loadedmetadata', handleLoadedMeta)
      window.removeEventListener('resize', updateSize)
      document.removeEventListener('keydown', handleSpace)
    }

  }, [])

  useEffect(() => {
    let title = '';
    let artist = '';
    if (track) {
      let song;
      if (track[0]) {
        song = songD[playlistD[track[0]][track[1]][0]];
      } else {
        song = Object.values(songD)[track[1]]
      }
      artist = song.artist;
      title = song.title;

      setSongInfo(song)

    }
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({ title, artist });
      navigator.mediaSession.setActionHandler('previoustrack', skip(-1));
      navigator.mediaSession.setActionHandler('nexttrack', skip(1));
    }
  }, [track, playlistD]) // remount when new track or when playlist is modified


  function handleTimeUpdate(e) {
    if (duration && !down) {
      setProgress(e.target.currentTime / duration[0]);
    }
  }

  const handleMouseUp = (e) => {
    const aud = document.querySelector('audio');
    const prog = e.clientX / winWidth;
    setProgress(prog);

    aud.currentTime = prog * duration[0];
    setDown(false);
    document.removeEventListener('mousemove', updateDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = (e) => {
    const aud = document.querySelector('audio');
    const prog = e.changedTouches[0].clientX / winWidth;
    setProgress(prog);
    aud.currentTime = prog * duration[0];
    setDown(false);
    document.removeEventListener('touchmove', updateDrag);
    document.removeEventListener('touchend', handleTouchEnd);
  };


  const updateDrag = (e) => {
    let prog;
    if (!e.clientX) {
      prog = e.touches[0].clientX / winWidth;
    } else {
      prog = e.clientX / winWidth;
    }
    setProgress(prog);
  };

  const ProgressBarHandler = {
    onMouseDown: (e) => {
      if (!e.clientX) return
      e.stopPropagation()
      e.preventDefault()
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




  // const handleTouchMove = useCallback(
  //   event => {
  //     console.log(
  //       event.touches[0].clientY,
  //       startY
  //     );
  //     if (event.touches[0].clientY) {
  //       if (!startY) {
  //         setStartY(event.touches[0].clientY)
  //       } else {
  //         if (event.touches[0].clientY > startY) {
  //           console.log("IS GREATER");
  //         }
  //       }
  //     }
  //   },
  //   [startY]
  // );

  const [startY, setStartY] = useState(null)

  const handleTouchStart = useCallback(event => {
    setStartY(event.touches[0].clientY)
  }, []);


  const handleTouchEndx = useCallback(
    e => {
      console.log(
        'end',
        startY,
        e.changedTouches[0].clientY,
      );
      // setStartY(null)
    },
    [startY]
  );

  useEffect(() => {
    // window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEndx);
    return () => {
      // window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEndx);
    };
  // }, [handleTouchMove, handleTouchEndx]);
  }, [handleTouchEndx]);



  return <>
    <PlayerDiv onTouchStart={handleTouchStart}>
      {/* <PlayerDiv>  */}

      <ProgressBar {...ProgressBarHandler}>
        <div className='track-elapsed' style={{ width: `${progress * 100}%` }} />
        <div className='thumb-container' >
          <div className='thumb' />
        </div>
        <div className='track-remaining' style={{ width: `${100 - progress * 100}%` }} />
      </ProgressBar>

      <div className='control' >
        {winWidth > 500 && <img src={prev} onClick={skip(-1)} className='skip-button' />}
        {playing
          ?
          <img src={pauseIcon} className='play-button'
            onClick={(e) => {
              const aud = document.querySelector('audio');
              aud.pause();
              dispatch({ type: ent_act.SET_PAUSE })
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
            }}
          />
          :
          <img src={playIcon} className='play-button'
            onClick={(e) => {
              const aud = document.querySelector('audio');
              if (aud.emptied) return;
              aud.play();
              dispatch({ type: ent_act.SET_PLAY })
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
            }}
          />
        }
        {winWidth > 500 && <img src={next} onClick={skip(1)} className='skip-button' />}
      </div>

      {duration &&
        <div className='time-info'>
          {`${convertSecsToMins(progress * duration[0])}`}/{duration[1]}
        </div>
      }
      <div className='song-info'>
        <div>{songInfo && songInfo.artist}</div>
        <div>{songInfo && songInfo.title}</div>
      </div>
    </PlayerDiv>
    <audio
      autoPlay src={songUrl}
      onEnded={skip(1)}
      onTimeUpdate={handleTimeUpdate}
    />
  </>
};
