import { useDispatch, useSelector } from 'react-redux';
import React, { useRef } from 'react';

import { editSongs } from '../actions/actions'
import { useTextField } from '../util/hooks'
import { context_act } from '../reducers/root_reducer'
import { useEffect } from 'react';

import {ContextFormWrap} from './contextMenu';

const options = { year: 'numeric', month: 'long', day: 'numeric' }

export default function SongEditForm() {

  const dispatch = useDispatch();
  const form = useRef(null)
  const songD = useSelector(state => state.entities.songD);
  const contextMenu = useSelector(state => state.ui.contextMenu);

  useEffect(()=>{
    document.getElementsByName('title')[0].focus()
  },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    const song = new FormData(form.current);
    song.append('ids', JSON.stringify(contextMenu.song_id))
    dispatch(editSongs(song))
    dispatch({ type: context_act.CLOSE_CONTEXT })
  }
  
  return (
    <ContextFormWrap onClick={(e) => e.stopPropagation()}>
      <div className="title">Edit Song</div>
      <div className="spacer"></div>
      <form onSubmit={handleSubmit} id="songEditForm" ref={form}>
        {Object.entries(songD[contextMenu.song_id]).filter(e => !['id','date_added','order','yt_id'].includes(e[0])).map(
          (field, i) => (
            <div key={i} className="login-input">
              <div className="field">{field[0].replace(/_/g, ' ')}</div>
              <input type="text"
                {...useTextField(...field)} //useTextField to load preloaded text
              />
            </div>
          )
        )}
        <div className="spacer"></div>
        <div className='button-box'>
          <input className="submit-button"
            type="submit" value="Done"
          />
        </div>
      </form>

    </ ContextFormWrap>

  );
}