import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';
import styled from 'styled-components'

import { editPlaylist } from '../actions/actions'
import { useTextField } from '../util/hooks'
import { context_act } from '../reducers/ui_reducer'
import { useEffect } from 'react';



const renderErrors = () => {
  const errors = useSelector(state => state.errors);
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

const SongEditDiv = styled.div`
  position:absolute;
  left:0;
  right: 0;
  bottom:0;
  padding: 1em;
  background-color:white;
  .field {
    text-transform: capitalize;
    font-size: .7em;
    color: gray;
  }

  input[type=text] {
    margin-bottom: 1em;
    width:100%;
  }

  .spacer {
    height: 1em;
  }

  .button-box {
    display:flex;
    justify-content: flex-end;
  }

  input[type=submit], button{
    cursor:pointer;
    background-color: white;
    border: 0;
    text-transform: uppercase;
    font-size: .9em;
    color: #CE1141;
  }


`

export default function PlaylistEditForm() {

  const dispatch = useDispatch();

  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD);
  const contextMenu = useSelector(state => state.ui.contextMenu);

  useEffect(()=>{
    document.getElementsByName('title')[0].focus()
  },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById('songEditForm'));
    dispatch(editPlaylist(form))
    dispatch({ type: context_act.CLOSE_CONTEXT })
  }
  
  return (
    <SongEditDiv onClick={(e) => e.stopPropagation()}>
      <div className="title">Edit Playlist</div>
      <div className="spacer"></div>
      <form onSubmit={handleSubmit} id="songEditForm">
        {Object.entries(titleD[contextMenu.playlist_id]).map(
          (field, i) => (
            <div key={i} className="login-input">
              <div className="field">{field[0]}</div>
              <input type="text"
                {...useTextField(...field)} //useTextField to load preloaded text
              />
            </div>
          )
        )}
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

    </ SongEditDiv>

  );
}