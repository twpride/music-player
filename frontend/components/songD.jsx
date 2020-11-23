
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';
import burgerIcon from '../icons/burger.svg'

import { getSongUrl } from '../actions/actions'
import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import Header from './header'

const CardDiv = styled.div`
  font-size: .9em;
  font-family: Sans-Serif;
  display:flex;
  flex-direction:row;
  /* justify-content: space-between; */
  align-items: center;
  width: 100%;
  >div {
    height: 4em;
    opacity: ${props=>props.isDragging ? 0.4 : 1};

    &:not(:nth-child(2)) {
      min-width:3em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &:nth-child(2) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width:22.5em; */
      div {
        overflow:hidden;
        white-space: nowrap;
        &:nth-child(1) {
          color: #606060;
        }
      }
    }
  }
`
export default function SongD() {
  const dispatch = useDispatch();

  const playSong = (id, i) => (e) => {
    dispatch({ type: ent_act.LOAD_TRACK, track: [null, i] })
    dispatch(getSongUrl(id))
  }

  const launchBurger = (id) => (e) => {
    e.stopPropagation()
    dispatch({ type: context_act.SONG_BURGER_C, id })
  }

  const songD = useSelector(state => state.entities.songD)

  return (
    <>
      <Header />
      <div className="scrollable">
        {Object.values(songD).map((song, i) => (
          <CardDiv key={i} onClick={playSong(song.id, i)}>
            <div><div>{i + 1}</div></div>
            <div>
              <div>{song.artist}&nbsp;</div>
              <div>{song.title}&nbsp;</div>
            </div>
            <div onClick={launchBurger(song.id)}>
              <div><img src={burgerIcon} /></div>
            </div>
          </CardDiv>
        ))}
      </div>
    </>
  )
};






