import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';


import styled from 'styled-components'
import { context_act } from '../reducers/ui_reducer'


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
  .burger-list {
    margin-bottom: 1em;
  }

`
export default function SongBurger(props) {

  const dispatch = useDispatch();


  const burgerList = {
    "Edit song": () => {
      dispatch({ type: context_act.SONG_EDIT_C, id: props.id })
    },
    "Add to playlist": () => dispatch(
      { type: context_act.SELECT_PLAYLIST_C, id: props.id }),
    "Delete song": () => { console.log(3) },
  }

  return (
    <BurgerDiv>
      {Object.entries(burgerList).map(([name, cb], i) => (
        <div key={i} onClick={cb} className="burger-list">
          {name}
        </div>
      ))}
      <div className="close-modal" onClick={() => dispatch(
        { type: context_act.CLOSE_CONTEXT })}>
        X
      </div>
    </BurgerDiv>
  );
}