import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { login } from '../actions/session_actions';

import { closeContextMenu } from '../actions/ui_actions';
import { useTextField } from './hooks'

export default function SongEditForm(props) {

  const dispatch = useDispatch();

  const song = useSelector(state => state.entities.songD[props.id]);

  const errors = useSelector(state => state.errors);


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
      <div className="login-form-container">
        <h1 className="login-signup">Edit Song</h1>

        <form onSubmit={handleSubmit} className="login-form-box" id="loginForm">

          {Object.entries(song).map((field, i) => (
            <div key={i} className="login-input">
              <div>{field[0]}</div>
              <input type="text"
              {...useTextField(field)}
              />
            </div>
          ))}

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