import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';

import styled from 'styled-components'

import { session_act } from '../reducers/session_reducer';
import { ent_act } from '../reducers/root_reducer';
import { logout } from '../util/session_api_util'
import AudioVisualizer from './audio_visualizer'

export const HeaderDiv = styled.div`
  padding: 0 1.4em;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
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
  }
`

export default function Header({ title }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser)

  const containerRef = useRef()

  useEffect(() => {
    function resumeAudioCtx(e) {
      visualizer.audctx.resume()
      window.removeEventListener('touchend', resumeAudioCtx)
    }
    const visualizer = new AudioVisualizer(containerRef.current)
    visualizer.startRenderer()
    window.addEventListener('touchend', resumeAudioCtx)
  }, [])

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
