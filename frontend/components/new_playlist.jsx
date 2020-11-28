import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { ent_act } from '../reducers/root_reducer'
import { context_act} from '../reducers/ui_reducer'
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
import { ContextFormWrap } from './contextMenu'
export default function NewPlaylist() {

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playlistTitle = new FormData(document.getElementById('createPlaylist'));

    const res = await createPlaylist(playlistTitle)
    if (res.ok) {
      const playlistTitleD = await res.json()
      const playlist_id = Object.values(playlistTitleD)[0].id
      dispatch({ type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD })
      dispatch({ type: ent_act.RECEIVE_PLAYLIST, playlist_id, playlist: [] }) // update store
      dispatch({ type: context_act.CLOSE_CONTEXT}) // update store
    } else {
      const errors = await res.json()
      dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors })
    }


  }


  return (
    <ContextFormWrap onClick={(e) => e.stopPropagation()}>
      <div className="title">Create new playlist</div>

      <form onSubmit={handleSubmit} className="login-form-box" id="createPlaylist">
        <div className="login-input">
          <div className='field'>Title</div>
          <input type="text" name="title" />
        </div>
        {/* {renderErrors()} */}
        <div className="spacer"></div>
        <div className='button-box'>
          <button className="close-modal" onClick={() => dispatch({ type: context_act.CLOSE_CONTEXT })}>
            Cancel
          </button>
          <input className="submit-button"
            type="submit" value="Done"
          />
        </div>
      </form>

    </ContextFormWrap>
  );
}