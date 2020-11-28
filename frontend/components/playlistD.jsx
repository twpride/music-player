
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import styled from 'styled-components'

import { getPlaylistTitleD } from '../actions/actions'
import { modal_act } from '../reducers/ui_reducer'

import { Link } from 'react-router-dom'
import Header from './header'
import burgerIcon from '../icons/burger.svg';

import { context_act } from '../reducers/ui_reducer'
const PlaylistDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:100%;
  width:100%;
`

export default function PlaylistD() {

  const dispatch = useDispatch();

  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)

  useEffect(() => {
    if (!titleD) {
      dispatch(getPlaylistTitleD())
    }
  }, [])

  const launchBurger = (playlist_id) => (e) => {
    e.stopPropagation()
    dispatch({ type: context_act.PLAYLIST_BURGER_C, playlist_id })
  }

  return <>
    <Header title='Playlists' />
    <div className="scrollable">
      <PlaylistDiv>
        <div onClick={() => dispatch({ type: modal_act.NEW_PLAYLIST })}> New Playlist</div>
        {titleD && Object.values(titleD).map((pl, index) => (
          <div>
            <Link key={index} to={`/playlist_D/${pl.id}`}>
              {pl.title}
            </Link>
            <div onClick={launchBurger(pl.id)}>
              <div><img src={burgerIcon} /></div>
            </div>
          </div>
        ))}
      </PlaylistDiv>
    </div>
  </>
};












