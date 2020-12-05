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
  .noselect{
    user-select: none;  
    -webkit-user-select: none; 
    -moz-user-select: none; 
  }
`


export default function AudioPlayer({ setAudSource }) {
  const dispatch = useDispatch();
  const [winWidth, setWinWidth] = useState(window.innerWidh);
  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(0);
  const [down, setDown] = useState(false);
  const [songInfo, setSongInfo] = useState(null);

  const songUrl = useSelector(state => state.player.songUrl);
  const playlist_dir = useSelector(state => state.entities.playlistD);
  const songD = useSelector(state => state.entities.songD);
  const playlistD = useSelector(state => state.entities.playlistD);
  const track = useSelector(state => state.player.track);
  const playing = useSelector(state => state.player.playing);

  const aud = useRef()
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
    let sec;
    if (window.webkitAudioContext) { // webkit audio doubles song duration with silent second half
      sec = e.target.duration / 2;
    } else {
      sec = e.target.duration;
    }
    setDuration([sec, convertSecsToMins(sec)])
  }
  function handleSpace(e) {
    if (e.target.type === 'text') return;
    // if (e.key === " ") document.getElementsByClassName('play-button')[0].click()
    if (e.key === " ") onPlayClick()
  }
  useEffect(() => {
    window.aud = aud.current;

    aud.current.addEventListener('loadedmetadata', handleLoadedMeta);

    window.addEventListener('resize', updateSize)
    updateSize()

    document.addEventListener('keydown', handleSpace)


    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const source = ctx.createMediaElementSource(aud.current)

		const analyzer = [ ctx.createAnalyser(), ctx.createAnalyser() ];
		const splitter = ctx.createChannelSplitter(2);
 		const merger   = ctx.createChannelMerger(2);
		for ( let i = 0; i < 2; i++ ) {
			splitter.connect(analyzer[ i ], i );
			analyzer[ i ].connect(merger, 0, i );
		}
    source.connect(splitter)


    source.connect(ctx.destination)

    setAudSource(analyzer)

    return () => {
      aud.current.removeEventListener('loadedmetadata', handleLoadedMeta)
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
    const prog = e.target.currentTime / duration[0];
    if (window.webkitAudioContext && prog >= 1) {
      skip(1)()
    }
    if (!down) {
      setProgress(prog);
    }
  }

  const handleMouseUp = (e) => {
    e.stopPropagation()
    // e.preventDefault()
    const prog = e.clientX / winWidth;
    setProgress(prog);

    aud.current.currentTime = prog * duration[0];
    setDown(false);
    document.removeEventListener('mousemove', updateDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation()
    // e.preventDefault()
    const prog = e.changedTouches[0].clientX / winWidth;
    setProgress(prog);
    aud.current.currentTime = prog * duration[0];
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
      // e.preventDefault()
      if (!duration) return;
      setProgress(e.clientX / winWidth);
      setDown(true);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', updateDrag);
    },
    onTouchStart: (e) => {
      e.stopPropagation()
      // e.preventDefault()
      if (!duration) return;
      setProgress(e.touches[0].clientX / winWidth);
      setDown(true);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchmove', updateDrag);
    },
  }



  const [start, setStart] = useState(null)

  const handleTouchStart = e => {
    setStart(e.touches[0].clientX)
  }

  const handleTouchEndx = useCallback(
    e => {
      const dir = e.changedTouches[0].clientX - start;
      // console.log( dir, start, e.changedTouches[0].clientX);
      if (!start) return;
      setStart(null)
      if (Math.abs(dir) < 100) {
        const pl_id = track[0]
        if (pl_id) {
          history.push(`/playlist_D/${pl_id}`)
        } else {
          history.push('')
        }
      } else if (dir > 0) {
        skip(-1)()
      } else {
        skip(1)()
      }
    },
    [start]
  );

  const playerdiv = useRef(null)
  useEffect(() => {
    playerdiv.current.addEventListener("touchend", handleTouchEndx);
    return () => {
      playerdiv.current.removeEventListener("touchend", handleTouchEndx);
    };
  }, [handleTouchEndx]);

  function onPlayClick() {
    if (!aud.current.paused) {
      aud.current.pause();
      dispatch({ type: ent_act.SET_PAUSE })
    } else if (!aud.current.emptied) {
      aud.current.play();
      dispatch({ type: ent_act.SET_PLAY })
    }
  }

  return <>
    <PlayerDiv ref={playerdiv} onTouchStart={handleTouchStart}>

      <ProgressBar {...ProgressBarHandler}>
        <div className='track-elapsed' style={{ width: `${progress * 100}%` }} />
        <div className='thumb-container' >
          <div className='thumb' />
        </div>
        <div className='track-remaining' style={{ width: `${100 - progress * 100}%` }} />
      </ProgressBar>

      <div className='control' >
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
    </PlayerDiv>
    <audio
      // controls
      ref={aud}
      crossOrigin="anonymous"
      autoPlay src={songUrl}
      onEnded={skip(1)}
      onTimeUpdate={handleTimeUpdate}
    />
  </>
};
