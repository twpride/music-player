import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';
import styled from 'styled-components'

import { editSongs } from '../actions/actions'
import { useTextField } from '../util/hooks'
import { context_act } from '../reducers/ui_reducer'


const ModalDiv = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: beige;
  z-index: 1;

  .field {
    text-transform: capitalize;
  }
`
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


export default function SongEditForm(props) {

  const dispatch = useDispatch();

  const songState = useSelector(state => state.entities.songD[props.id]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const song = new FormData(document.getElementById('songEditForm'));
    song.append('ids', JSON.stringify(props.id))
    dispatch(editSongs(song))
  }

  return (
    <>
      <div className="login-form-container">
        <h1 className="login-signup">Edit Song</h1>

        <form onSubmit={handleSubmit} className="login-form-box" id="songEditForm">

          {Object.entries(songState).filter(e => e[0] != 'id').map(
            (field, i) => (
              <div key={i} className="login-input">
                <div className="field">{field[0]}</div>
                <input type="text"
                  {...useTextField(...field)}
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

      <div className="close-modal" onClick={() => dispatch({ type: context_act.CLOSE_CONTEXT })}>
        X
      </div>
    </>
  );
}