
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';


import burgerIcon from '../icons/burger.svg';
import { getSongUrl } from '../actions/actions'
import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import Header from './header'
import PlayingIcon from '../icons/playing.gif'
import PausedIcon from '../icons/paused.gif'


export const CardDiv = styled.div`
  font-size: .9em;
  display:flex;
  flex-direction:row;
  align-items: center;
  &:hover {
      background-color: #F0F0F0;
  }
  >div {
    height: 4em;
    opacity: ${props => props.isDragging ? 0.4 : 1};

    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      overflow:hidden;
      white-space: nowrap;
      div:nth-child(1) {
        color: #777777;
      }
    }

    &:not(:nth-child(2)) {
      min-width:3em;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:last-of-type {
      margin-left: auto;
    }
  }
  img.equalizer {
    height:14px;
  }
  .noselect{
    user-select: none;  
  }
`

export const Equalizer = ({track, pl_id, index, playing}) => {
  if (track && track[0]===pl_id && track[1]===index) {
    if (playing) {
      return <img className='equalizer' src={PlayingIcon}></img>
    } else {
      return <img className='equalizer' src={PausedIcon}></img>
    }
  } else {
    return index + 1
  } 
}

export default function SongD() {
  const dispatch = useDispatch();
  const track = useSelector(state => state.player.track)
  const playing = useSelector(state => state.player.playing)
  const playSong = (id, i) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (document.getSelection().type === 'Range') return;
    dispatch({ type: ent_act.LOAD_TRACK, track: [null, i] })
    dispatch(getSongUrl(id))
    dispatch({ type: ent_act.SET_PLAY })
  }

  const launchBurger = (song_id) => (e) => {
    e.stopPropagation()
    dispatch({ type: context_act.SONG_BURGER_C, song_id, playlist_id: null })
  }

  const songD = useSelector(state => state.entities.songD)

  return (
    <>
      <Header title='Songs'/>
      <div className="scrollable">
        {Object.values(songD).map((song, i) => (
          <CardDiv key={i} onClick={playSong(song.id, i)}>
            <div>
              <Equalizer 
                track={track}
                pl_id={null}
                index={i}
                playing={playing}
              />
            </div>
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






