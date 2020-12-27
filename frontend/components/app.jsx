import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components'

import Playlist from './playlist';
import PlaylistD from './playlistD';
import AudioPlayer from './audio_player'
import AlbumArt from './album_art'
import Navbar from './navbar';
import ContextMenu from './contextMenu'

import Header from './header'
import LoginForm from './login_form'
import SignupForm from './signup_form'

import { initStore } from '../util/api_util'
import { ProtectedRoute } from '../util/route_util'
import { loginThunk } from '../actions/actions'
import { ent_act } from "../reducers/root_reducer"
import SearchResultsD from './searchResultsD'

import { HoverGithub, HoverLinkedin } from './active_svgs'

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  width:100%;

  .scrollable {
    z-index:1;
    min-width:375px;
    overflow-y:auto;
    flex: 1 1 50%;

  }

  .box {
    overflow-y:hidden;
    height:100%;
    display:flex;
    flex-direction: row;
    justify-content:flex-end;
  }

  .full-width {
    z-index:1;
    width:100%;
    overflow-y:auto;
    flex-shrink: 0;
    display:flex;
    flex-direction:column;
    align-items:center;
  }

  background: ${props => `${props.darkMode ? "#222" : "#fff"}`} ; 
  color: ${props => `${props.darkMode ? "#eee" : "#000"}`} ; 

  .scrollable>div:hover, .row:hover {
    background: ${props => `${props.darkMode ? "#333" : "#eee"}`} ; 
  }

  input[type=text], input[type=password] {
    color: ${props => `${props.darkMode ? "#eee" : "#000"}`} ; 
  }

  textarea {
    color: ${props => `${props.darkMode ? "#eee" : "#000"}`} ; 
    font-size: 16px;
    background-color: transparent;
  }
  
  a {
    text-decoration: none;
    color: ${props => `${props.darkMode ? "#eee" : "#000"}`} ; 
  }
  
  >div:nth-child(1) {
  box-shadow: 0 1px 6px 0 ${props => `${props.darkMode ? "rgba(0, 0, 0, .8)" : "rgba(32, 33, 36, 0.28)"}`} ; 
  }
  
  /* >div:nth-child(5) {
    background: ${props => `${props.darkMode ? "blue" : "rgba(0, 0, 0, .5)"}`};
  } */
  >div:nth-child(6) {
    background: ${props => `${props.darkMode ? "rgba(0, 0, 0, .7)" : "rgba(0, 0, 0, .5)"}`};
    >div {
      background: ${props => `${props.darkMode ? "#222" : "#fff"}`} ; 
    } 
  }

  >div:nth-child(5) {
  border-top: 1px solid ${props => `${props.darkMode ? "#444" : "#ccc"}`} ;
  /* background: ${props => `${props.darkMode ? "blue" : "rgba(0, 0, 0, .5)"}`}; */
  }

  .context-header{
  border-bottom: 1px solid ${props => `${props.darkMode ? "#444" : "#ccc"}`} ;
  }



  svg {
    fill:#bbb;
  }

`

const App = () => {

  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch()
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  window.winWith = winWidth;
  useEffect(() => {
    const fetchData = async () => {
      const [songD, playlistTitleD, darkMode] = await initStore().then(response => response.json())
      // const playlistTitleD = await getPlaylistTitleD().then(response => response.json())
      dispatch({ type: ent_act.INIT_STORE, songD, playlistTitleD })
      setDarkMode(darkMode);

    }
    fetchData()

    window.addEventListener('resize', () => setWinWidth(window.innerWidth))
  }, [])


  return (
    <AppDiv darkMode={darkMode}>
      <Header title='Songs' setDarkMode={setDarkMode} />
      <div className='box'>
        {winWidth > 730 && <AlbumArt />}
        <Switch>
          <Route exact path='/' >
            <Playlist />
          </Route>
          <Route exact path='/upload' >
            <SearchResultsD />
          </Route>
          <Route path='/playlist_d/:playlist_id'>
            <Playlist />
          </Route>
          <Route path='/playlist_d/'>
            <PlaylistD />
          </Route>
        </Switch>
      </div>
      <AudioPlayer winWidth={winWidth} />
      <Navbar />
      <ContextMenu />
    </AppDiv>
  )
};



const SplashDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100%;



  input[type=text], input[type=password] {
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid grey;
    outline: none;
    font-size: 16px;
  }

  input[type=text]:focus {
    border-color:#ad0f37;
  }

  input[type=submit], button{
    cursor:pointer;
    background: none;
    border: 0;
    padding: 0;
    font-size: 1em;
    color: #ad0f37;
  }

  svg {
    fill:grey;
  }
  svg:hover {
    fill:#ad0f37;
  }
  >button {
    padding: 1.5em;
    color: #777;
  }
  >button:hover {
    padding: 1.5em;
    color: #ad0f37;
  }
  div.favicon-links {
    position:absolute;
    bottom:5em;
  }

`

const svgProps = {
  scale: 0.48,
  size: "50px",
  color: "grey",
  hoverColor: "#ad0f37"
}

export default function Splash() {
  const [mode, setMode] = useState(null)
  const dispatch = useDispatch()

  const demoScript = () => {
    const form = new FormData();
    form.append('email', 'demo1')
    form.append('password', 'demodemo')
    dispatch(loginThunk(form))
  }



  const demoScript2 = () => {
    const form = new FormData();
    form.append('email', 'demo2')
    form.append('password', 'demodemo')
    dispatch(loginThunk(form))
  }

  const Choose = () => (
    <>
      <button onClick={() => setMode('login')}>Log in</button>
      <button onClick={() => setMode('signup')}>Sign up</button>
      <button onClick={demoScript}>Demo User 1</button>
      <button onClick={demoScript2}>Demo User 2</button>
    </>
  )

  let Comp;
  switch (mode) {
    case 'login':
      Comp = LoginForm;
      break;
    case 'signup':
      Comp = SignupForm;
      break;
    default:
      Comp = Choose;
  }
  const currentUser = useSelector(state => state.session.currentUser);
  return (
    <>
      <SplashDiv>
        <ProtectedRoute path='/' component={App} />
        {/* we dont use auth route because it doesnt allow 
        for routing to url when logged in*/}
        {!currentUser &&
          <>
            <Comp setMode={setMode} />
            <div className="favicon-links">
              <a href='https://github.com/twpride/music-player-1'>
                <HoverGithub {...svgProps}></HoverGithub>
              </a>
              <a href='https://www.linkedin.com/in/howard-hwang-b3000335'>
                <HoverLinkedin {...svgProps}></HoverLinkedin>
              </a>
            </div>
          </>
        }
      </SplashDiv>
    </>
  )
}



