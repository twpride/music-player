import { useDispatch, useSelector } from 'react-redux';
import React, { useRef } from 'react';
import styled from 'styled-components'

import { editPlaylist } from '../actions/actions'
import { useTextField } from '../util/hooks'
import { context_act } from '../reducers/ui_reducer'
import { useEffect } from 'react';
import { ContextFormWrap } from './contextMenu'


// weird syntax to deal with cyclic import
// https://github.com/styled-components/styled-components/issues/1449#issuecomment-420087359
const PlaylistEditDiv = styled(props => <ContextFormWrap {...props} />)` 
  #id {
    display:none;
  }
`;

export default function PlaylistEditForm() {

  const dispatch = useDispatch();
  const formRef = useRef(null)
  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD);
  const contextMenu = useSelector(state => state.ui.contextMenu);

  // useEffect(()=>{
  //   document.getElementsByName('title')[0].focus()
  // },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    form.append('id',contextMenu.playlist_id)
    dispatch(editPlaylist(form))
    dispatch({ type: context_act.CLOSE_CONTEXT })
  }

  return (
    <PlaylistEditDiv onClick={(e) => e.stopPropagation()}>
      {/* <ContextFormWrap onClick={(e) => e.stopPropagation()}> */}
      <div className="title">Rename playlist</div>
      <div className="spacer"></div>
      <form onSubmit={handleSubmit} ref={formRef} id="songEditForm">
        <input type="text" {...useTextField('title',titleD[contextMenu.playlist_id])} //useTextField to load preloaded text
        />
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
      {/* </ContextFormWrap> */}
    </ PlaylistEditDiv>

  );
}