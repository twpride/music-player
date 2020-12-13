import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { ent_act } from '../reducers/root_reducer'
import { context_act } from '../reducers/ui_reducer'
import { createPlaylist } from '../util/api_util'

import { ContextFormWrap } from './contextMenu'
import { useRef } from 'react';
export default function NewPlaylist() {
  const form = useRef(null)
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementsByName('title')[0].focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playlistTitle = new FormData(form.current);

    const res = await createPlaylist(playlistTitle)
    if (res.ok) {
      const playlistTitleD = await res.json()
      dispatch({ type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD })
      dispatch({ type: context_act.CLOSE_CONTEXT }) // update store
    } else {
      const errors = await res.json()
      dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors })
    }
  }


  return (
    <ContextFormWrap
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div className="title">Create new playlist</div>
      <div className="spacer"></div>
      <form onSubmit={handleSubmit} ref={form} className="login-form-box" id="createPlaylist">
        <div className="login-input">
          <div className='field'>Title</div>
          <input type="text" name="title" />
        </div>
        <div className="spacer"></div>
        <div className='button-box'>
          <input className="submit-button"
            type="submit" value="Done"
          />
        </div>
      </form>

    </ContextFormWrap>
  );
}