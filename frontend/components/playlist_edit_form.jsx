import { useDispatch, useSelector } from 'react-redux';
import React, { useRef } from 'react';

import { editPlaylist } from '../actions/actions'
import { useTextField } from '../util/hooks'
import { context_act } from '../reducers/root_reducer'
import { ContextFormWrap } from './contextMenu'

export default function PlaylistEditForm() {

  const dispatch = useDispatch();
  const formRef = useRef(null)
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD);
  const contextMenu = useSelector(state => state.ui.contextMenu);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    form.append('id', contextMenu.playlist_id)
    dispatch(editPlaylist(form))
    dispatch({ type: context_act.CLOSE_CONTEXT })
  }

  return (
    <ContextFormWrap onClick={(e) => e.stopPropagation()}>
      <div className="title">Rename playlist</div>
      <div className="spacer"></div>
      <form onSubmit={handleSubmit} ref={formRef} id="songEditForm">
        <input type="text" {...useTextField('title', titleD[contextMenu.playlist_id])} //useTextField to load preloaded text
        />
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