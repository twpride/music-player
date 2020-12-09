import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components'

import { session_act } from '../reducers/session_reducer';
import { ent_act } from '../reducers/root_reducer';
import { logout } from '../util/session_api_util'
import AudioVisualizer from './audio_visualizer'
import { useLocation } from 'react-router-dom'

export const HeaderDiv = styled.div`
  padding: 0 1.4em;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;
  font-weight: 600;
  min-height: 50px;
  width: 100%;
  position:relative;
  border-bottom: 1px solid lightgrey;
  .title {
    font-size:1.2em;
  }
  #container {
    position:absolute;
    bottom:-30px;
    height:60px;
    left:0;
    width:100%;
  }
  button {
    z-index:10;
    position:absolute;
    top: 0;
    bottom:0;
    right: 20px;
    margin: auto auto;
  }
`

export default function Header() {
  const dispatch = useDispatch()
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)
  const [title, setTitle] = useState('')
  const containerRef = useRef()
  const location = useLocation()

  useEffect(() => {
    function resumeAudioCtx(e) {
      visualizer.audctx.resume()
      window.removeEventListener('touchend', resumeAudioCtx)
    }
    const visualizer = new AudioVisualizer(containerRef.current)
    visualizer.startRenderer()
    window.addEventListener('touchend', resumeAudioCtx)
  }, [])

  useEffect(() => {
    const locArr = location.pathname.split('/')
    if (locArr.length == 2) {
      setTitle('Songs')
    } else if (locArr.length == 3) {
      setTitle(locArr[2] ? titleD[locArr[2]] : "Playlists")
    }
  }, [location])

  return (
    <HeaderDiv className="nav">
      <div className='title'>{title}</div>
      <div id="container" ref={containerRef}> </div>
      <button onClick={() => {
        logout().then(
          () => {
            dispatch({ type: ent_act.SET_PAUSE })
            dispatch({ type: ent_act.LOAD_TRACK, track: null })
            dispatch({ type: ent_act.RECEIVE_SONG_URL, url: "" })
            dispatch({ type: session_act.LOGOUT_CURRENT_USER })
          }
        )
      }
      }>Log out</button>
    </HeaderDiv>
  )
};
