
import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';
import styled from 'styled-components'


import { Link } from 'react-router-dom'
import { BurgerIcon } from './active_svgs'

import { context_act } from '../reducers/ui_reducer'
const PlaylistTitleDiv = styled.div`
a {
  font-size: 1em;
  display:flex;
  flex-direction:row;
  align-items: center;
  padding-left: 1.5em;
  >div {
    height:60px;
    display:flex;
    align-items:center;
  }
  >:last-child {
    margin-left: auto;
    width:3em;
    justify-content:center;
  }
}

`

const NewPlaylistDiv = styled.button`
  margin-left: 1.5em;
  height:4em;
  display:flex;
  align-items:center;
`

export default function PlaylistD() {

  const dispatch = useDispatch();

  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)

  // useEffect(() => {
  //   // if (!titleD) {
  //   //   dispatch(getPlaylistTitleD())
  //   // }
  // }, [])

  const launchBurger = (playlist_id) => (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch({ type: context_act.PLAYLIST_BURGER_C, playlist_id })
  }

  return (
    <div className="scrollable">
      {titleD && Object.entries(titleD).map((pl, index) => (
        <PlaylistTitleDiv>
          <Link key={index} to={`/playlist_D/${pl[0]}`} className='row'>
            <div>{pl[1]}</div>
            <div onClick={launchBurger(pl[0])}>
              <BurgerIcon {...{ scale: 0.5, width: "40px", height: "60px" }} />
            </div>
          </Link>
        </PlaylistTitleDiv>
      ))}
      <NewPlaylistDiv
        onClick={() => dispatch({ type: context_act.NEW_PLAYLIST })}
      >
        New playlist
      </NewPlaylistDiv>
    </div>
  )
};












