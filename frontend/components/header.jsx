import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components'

import { session_act } from '../reducers/session_reducer';
import { ent_act } from '../reducers/root_reducer';
import AudioVisualizer from './audio_visualizer'
import { useLocation } from 'react-router-dom'
import { context_act } from '../reducers/ui_reducer';
import { HoverAccount, HoverGithub, HoverLinkedin } from './active_svgs'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';
import SearchBox from './search_box'

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  font-weight: 600;
  min-height: 50px;
  width: 100%;
  position:relative;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
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
    &:nth-child(4) {
      margin-left:auto;
    }
  }
  a {
    z-index:10;
    &:nth-child(2) {
      margin-right:auto;
    }

  }
  img {
    width:22px;
    height:22px;
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
      visualizer.paused = false;
      visualizer.startRenderer()
    }
    function mobileVizWorkaround(e) {
      visualizer.audctx.resume()
      window.removeEventListener('touchend', mobileVizWorkaround)
    }

    function suspendAudioCtx(e) {
      visualizer.paused = true;
    }
    const visualizer = new AudioVisualizer(containerRef.current)
    window.viz = visualizer;
    visualizer.startRenderer()

    window.addEventListener('touchend', mobileVizWorkaround)
    window.addEventListener('resumeViz', resumeAudioCtx)
    window.addEventListener('suspendViz', suspendAudioCtx)

    return () => {
      window.removeEventListener('resumeViz', resumeAudioCtx)
      window.removeEventListener('suspendViz', suspendAudioCtx)
    }
  }, [])

  useEffect(() => {
    const locArr = location.pathname.split('/')
    console.log(locArr)
    if (locArr[1] == 'upload') {
      setTitle('')
      window.dispatchEvent(new Event('suspendViz'))
    } else {
      if (!locArr[1]) {
        setTitle('Songs')
      } else {
        setTitle(locArr[2] ? titleD && titleD[locArr[2]] : "Playlists")
      }
      window.dispatchEvent(new Event('resumeViz'))
    }


  }, [location])

  const svgProps = {
    scale: 0.48,
    size: "50px",
    color: "grey",
    hoverColor: "#ad0f37"
  }

  return (
    <HeaderDiv>
      <Switch>
        <Route exact path='/upload' >
          <SearchBox />
        </Route>
        <Route path='/' >
          <a href='https://github.com/twpride/music-player-1'>
            <HoverGithub {...svgProps}></HoverGithub>
          </a>
          <a href='https://www.linkedin.com/in/howard-hwang-b3000335'>
            <HoverLinkedin {...svgProps}></HoverLinkedin>
          </a>
          <div className='title'>
            {title}
          </div>
          <button onClick={() => dispatch({ type: context_act.ACCOUNT })}>
            <HoverAccount {...svgProps} />
          </button>
        </Route>
      </Switch>

      <div id="container" ref={containerRef}> </div>
    </HeaderDiv>


  )
};
