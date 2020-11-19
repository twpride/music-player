import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { login } from '../actions/session_actions';

import { closeContextMenu } from '../actions/ui_actions';
import { editSongs } from './actions'
import { useTextField } from './hooks'




export default function SongEditForm(props) {

  const dispatch = useDispatch();

  const song = useSelector(state => state.entities.songD[props.id]);

  const errors = useSelector(state => state.errors);


  const handleSubmit = (e) => {
    e.preventDefault();
    const song = new FormData(document.getElementById('songEditForm'));
    song.append('ids',JSON.stringify(props.id))
    dispatch(editSongs(song))
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
      <div className="login-form-container">
        <h1 className="login-signup">Edit Song</h1>

        <form onSubmit={handleSubmit} className="login-form-box" id="songEditForm">

          {Object.entries(song).filter(e => e[0] != 'id').map(
            (field, i) => (
              <div key={i} className="login-input">
                <div>{field[0]}</div>
                <input type="text"
                  {...useTextField(field)}
                />
              </div>
            )
          )}

          {/* {renderErrors()} */}
          <input className="submit-button"
            type="submit"
          />
        </form>
        <div className="seperator"></div>

      </div>

      <div className="close-modal" onClick={() => dispatch(closeContextMenu())}>
        X
      </div>

    </div >
  );
}