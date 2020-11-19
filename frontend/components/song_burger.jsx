import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

import { closeContextMenu, openContextMenu} from '../actions/ui_actions';

import {ui} from '../reducers/ui_reducer'

export default function SongBurger(props) {

  const dispatch = useDispatch();

  const errors = useSelector(state => state.errors);

  const burgerList = {
    "Edit song": () => {
      dispatch({ type: ui.SONG_EDIT_C, id: props.id })
    },
    "Add to playlist": () => { console.log(2) },
    "Delete song": () => { console.log(3) },
  }



  const renderErrors = () => {
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

  return (
    <>
      {Object.entries(burgerList).map(([name, cb], i) => (
        <div key={i} onClick={cb}>
          {name}
        </div>
      ))}
      <div className="close-modal" onClick={() => dispatch({ type: ui.CLOSE_CONTEXT})}>
        X
      </div>
    </>
  );
}