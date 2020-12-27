import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components'

import AudioVisualizer from './audio_visualizer'
import { useLocation } from 'react-router-dom'
import { context_act } from '../reducers/ui_reducer';
import { HoverAccount, HoverGithub, HoverLinkedin, DarkIcon, LightIcon } from './active_svgs'
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
    &:nth-child(4) {
      margin-left:auto;
    }
  }
  a {
    display:flex;
    justify-content:center;
    align-items:center;
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

export default function Header({ darkMode, setDarkMode }) {
  const dispatch = useDispatch()
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)
  const [title, setTitle] = useState('')
  const containerRef = useRef()
  const location = useLocation()
  console.log(darkMode, 'what htefuck')
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
          <a href='https://github.com/twpride/music-player-1'>
            <HoverGithub {...svgProps}></HoverGithub>
          </a>
          <a href='https://www.linkedin.com/in/howard-hwang-b3000335'>
            <HoverLinkedin {...svgProps}></HoverLinkedin>
          </a>
          <div className='title'>
            {title}
          </div>
          <button onClick={(e) => {
            if (!e.screenX) return; //spaceback triggers click , dirty workaround
            setDarkMode(state => !state)
            setDarkModeAjax(darkMode ? 0 : 1)
          }}>
            {darkMode ?
              <LightIcon {...svgProps}/>
              :
              <DarkIcon {...svgProps}/>
            }
          </button>
          <button onClick={() => dispatch({ type: context_act.ACCOUNT })}>
            <HoverAccount {...svgProps} />
          </button>
        </Route>
      </Switch>

      <div id="container" ref={containerRef}> </div>
    </HeaderDiv>


  )
};
