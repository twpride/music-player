import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components'

import AudioVisualizer from './audio_visualizer'
import { useLocation } from 'react-router-dom'
import { context_act } from '../reducers/root_reducer';
import { HoverAccount, HoverGithub, HoverLinkedin, DarkIcon, LightIcon, HoverPortfolio } from './active_svgs'
import { Route, Switch } from 'react-router-dom';
import SearchBox from './search_box'
import { setDarkModeAjax } from '../util/api_util'

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  font-weight: 600;
  min-height: 50px;
  width: 100%;
  position:relative;
  z-index:3;

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
    display:flex;
    justify-content:center;
    align-items:center;
  }
  a {
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:10;
    &:nth-child(3) {
      margin-right:auto;
    }

  }
  img {
    width:22px;
    height:22px;
  }
  div:nth-child(5) {
    z-index:10;
    margin-left:auto;
  }
`
const ToggleDiv = styled.div`
  width:40px;
  height:24px;
  background:grey;
  &:hover {
    background:#ad0f37;
  }
  border-radius:18px;
  position:relative;
  div {
    position:absolute;
    background:#eee;
    width:16px;
    height:16px;
    margin:4px;
    border-radius:50%;
    left: ${props => `${props.checked ? 16 : 0}px`} ; 
    transition: 0.2s;
  }
  svg:first-of-type {
    position:absolute;
    left: ${props => `${props.checked ? 0 : 16}px`} ; 
    fill:#eee;
  }
  svg:first-of-type:hover {
    fill:#eee;
  }

`

export default function Header({ darkMode, setDarkMode }) {
  const dispatch = useDispatch()
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)
  const [title, setTitle] = useState('')
  const containerRef = useRef()
  const location = useLocation()
  useEffect(() => {
    function resumeAudioCtx(e) {
      visualizer.paused = false;
      // visualizer.startRenderer()
      requestAnimationFrame(visualizer.startRenderer)
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
    // visualizer.startRenderer()
    requestAnimationFrame(visualizer.startRenderer)

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
    // console.log(locArr)
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
    scale: .55,
    size: "50px",
  }

  return (
    <HeaderDiv>
      <Switch>
        <Route exact path='/upload' >
          <SearchBox />
        </Route>
        <Route path='/' >
          <a href='https://www.linkedin.com/in/howard-hwang-b3000335'>
            <HoverLinkedin {...svgProps}></HoverLinkedin>
          </a>
          <a href='https://github.com/twpride/music-player-1'>
            <HoverGithub {...svgProps}></HoverGithub>
          </a>
          <a href='https://twpride.github.io'>
            <HoverPortfolio {...svgProps}></HoverPortfolio>
          </a>
          <div className='title'>
            {title}
          </div>
          <ToggleDiv
            onClick={(e) => {
              if (!e.screenX) return; //spaceback triggers click , dirty workaround
              setDarkMode(state => !state)
              setDarkModeAjax(darkMode ? 0 : 1)
            }}
            checked={darkMode}
          >
            <div></div>
            {darkMode ?
              <DarkIcon {...{ size: "24px", scale: 0.7 }} />
              :
              <LightIcon {...{ size: "24px", scale: 0.7 }} />
            }
          </ToggleDiv>
          <button onClick={() => dispatch({ type: context_act.ACCOUNT })}>
            <HoverAccount {...svgProps} />
          </button>
        </Route>
      </Switch>

      <div id="container" ref={containerRef}> </div>
    </HeaderDiv>


  )
};
