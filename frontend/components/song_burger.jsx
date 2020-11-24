import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';


import styled from 'styled-components'
import { context_act } from '../reducers/ui_reducer'
import editIcon from '../icons/edit.svg'
import addToPlaylist from '../icons/addToPlaylist.svg'
import deleteIcon from '../icons/delete.svg'


const renderErrors = () => {
  const errors = useSelector(state => state.errors);
  return (
    <>
      {errors.map((error, i) => (
        <div key={`error-${i}`} className="form-error">
          {error}
        </div>
      ))}
    </>
  );
}

export const BurgerDiv = styled.div`
  position:absolute;
  left:0;
  right: 0;
  bottom:0;
  background-color:white;
  .burger-text {
    display: flex;
    /* justify-content: enter; */
    margin-left:1em;
    align-items: center;
  }
  .burger-row {
    padding: 1em 1em;
    display:flex;
    flex-direction: row;
    width:100%;
  }
  .song-info {
    display: flex;
    flex-direction: column;
    /* align-items: center */
    font-size:.9em;
    padding: 1em 1em;
    div:nth-child(1) {
      color: #777777;
    }
    border-bottom: 1px lightgrey solid;
  }

`
export default function SongBurger(props) {

  const dispatch = useDispatch();
  const songD = useSelector(state => state.entities.songD)

  const burgerList = {
    "Edit song": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.SONG_EDIT_C, id: props.id })
    },
    "Add to playlist": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.SELECT_PLAYLIST_C, id: props.id })
    },
    "Delete song": (e) => {
      e.stopPropagation()
      console.log(3)
    },
  }
  const icons = [
    editIcon, addToPlaylist, deleteIcon
  ]

  return (
    <BurgerDiv>
      <div className='song-info'>
        <div>{songD[props.id].artist}</div>
        <div>{songD[props.id].title}</div>
      </div>
      {Object.entries(burgerList).map(([name, cb], i) => (
        <div key={i} onClick={cb} className="burger-row">
          <img src={icons[i]} />
          <div className="burger-text">
            {name}
          </div>
        </div>
      ))}
    </BurgerDiv>
  );
}