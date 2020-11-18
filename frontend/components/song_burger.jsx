import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { login } from '../actions/session_actions';

import { closeContextMenu, openContextMenu} from '../actions/ui_actions';
import {SONG_EDIT_C} from './contextMenu'

export default function SongBurger(props) {

  const dispatch = useDispatch();

  const errors = useSelector(state => state.errors);

  const burgerList = {
    "Edit song": () => {
      dispatch(openContextMenu(SONG_EDIT_C, props.id))
    },
    "Add to playlist": () => { console.log(2) },
    "Delete song": () => { console.log(3) },
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById('loginForm'));
    dispatch(login(form))
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
    <div className="modal" >
      {Object.entries(burgerList).map(([name, cb], i) => (
        <div key={i} onClick={cb}>
          {name}
        </div>
      ))}
      <div className="close-modal" onClick={() => dispatch(closeContextMenu())}>
        X
      </div>
    </div >
  );
}