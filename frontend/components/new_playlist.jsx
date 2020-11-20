import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { modal_act } from '../reducers/ui_reducer'
import { createPlaylist } from '../util/api_util'
const renderErrors = () => {
  const errors = useSelector(state => state.errors.session)
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

export default function NewPlaylist() {


  const dispatch = useDispatch();

  const closeModals = () => dispatch({ type: modal_act.CLOSE_MODAL })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playlistTitle = new FormData(document.getElementById('loginForm'));

    const res = await create(playlistTitle)
    if (res.ok) {
      const playlist = await res.json()
      dispatch({ type: session_act.RECEIVE_CURRENT_USER, currentUser })
      dispatch({ type: modal_act.CLOSE_MODAL })
    } else {
      const errors = await res.json()
      dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors })
    }


  }


  return (
    <>
      <h1 className="login-signup">Create new playlist</h1>

      <form onSubmit={handleSubmit} className="login-form-box" id="loginForm">
        <div className="login-input">
          <div>Title</div>
          <input type="text"
            name="title"
          />
        </div>
        {renderErrors()}
        <input className="submit-button"
          value='Create'
          type="submit"
        />
      </form>

      <div className="close-modal" onClick={closeModals}>
        X
      </div>

    </>
  );
}