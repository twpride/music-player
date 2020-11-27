import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { modal_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
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
    const playlistTitle = new FormData(document.getElementById('createPlaylist'));

    const res = await createPlaylist(playlistTitle)
    if (res.ok) {
      const playlistTitleD = await res.json()
      const playlist_id = Object.values(playlistTitleD)[0].id
      dispatch({ type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD })
      dispatch({ type: ent_act.RECEIVE_PLAYLIST, playlist_id, playlist: [] }) // update store
    } else {
      const errors = await res.json()
      dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors })
    }


  }


  return (
    <>
      <h1 className="login-signup">Create new playlist</h1>

      <form onSubmit={handleSubmit} className="login-form-box" id="createPlaylist">
        <div className="login-input">
          <div>Title</div>
          <input type="text" name="title" />
        </div>
        {renderErrors()}
        <input className="submit-button" value='Create' type="submit" />
      </form>

      <button className="close-modal" onClick={closeModals}>
        Cancel
      </button>
    </>
  );
}