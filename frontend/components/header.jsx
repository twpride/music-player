import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useRef } from 'react';

import styled from 'styled-components'

import { session_act } from '../reducers/session_reducer';
import { ent_act } from '../reducers/root_reducer';
import { logout } from '../util/session_api_util'
import AudioVisualizer from './renderFunc'

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
  /* box-shadow: 0 3px 4px 0 rgba(0,0,0,0.03), 0 3px 3px -2px rgba(0,0,0,0.03), 0 1px 8px 0 rgba(0,0,0,0.05); */
  /* border-bottom: 1px solid lightgrey; */
  .title {
    font-size:1.2em;
    z-index:4;
  }
  #container {
    z-index:2;
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

  // const containerRef = useRef()
  // const visualizer = useRef(new AudioVisualizer(containerRef.current))

  const canvasRef = useRef()
  useEffect(() => {
    const visualizer = new AudioVisualizer(canvasRef.current)
    visualizer.startRenderer()

    function resumeAudioCtx(e) {
      visualizer.audctx.resume()
      window.removeEventListener('touchend', resumeAudioCtx)
    }
    window.addEventListener('touchend', resumeAudioCtx)


  }, [])

  // visualizer.current.startRenderer()






  return (
    <HeaderDiv className="nav">
      <div className='title'>{title}</div>
      {/* <div id="container" ref={containerRef}> </div> */}
      <canvas id='canvas' ref={canvasRef}></canvas>
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
