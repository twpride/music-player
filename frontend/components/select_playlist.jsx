import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';
import styled from 'styled-components'

import { editSongs } from '../actions/actions'
import { useTextField } from '../util/hooks'
import { context_act } from '../reducers/ui_reducer'

import { addTrack } from '../util/api_util'
import { ent_act } from '../reducers/root_reducer';

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


export default function SelectPlaylist(props) {

  const dispatch = useDispatch();

  const playlistD = useSelector(state => state.entities.playlistD)

  const click = (playlist_id) => (e) => {
    e.preventDefault();
    // dispatch({
    //   type: ent_act.APPEND_PLAYLIST,
    //   playlist_id, tracks:[[props.id]]
    // })


    // playlist entry schema "song_id", "Entry_pk","prev_id"
    addTrack(playlist_id, props.id)
      .then(res => res.json()) // Entry_pk of added track
      .then(entry_pk => {
        let prevId = null;
        if (playlistD[playlist_id].length) {
          const lastIdx = playlistD[playlist_id].length - 1;
          prevId = playlistD[playlist_id][lastIdx][1];
        }

        dispatch({
          type: ent_act.APPEND_PLAYLIST,
          playlist_id, tracks: [[props.id, entry_pk, prevId]]
        })
      })
  }

  return (
    <>
      <div className="login-form-container">
        <h1 className="login-signup">Edit Song</h1>

        {playlistD.playlistTitleD && playlistD.playlistTitleD.map((pl, index) => (
          <div key={index} onClick={click(pl.id)}>{pl.title}</div>
        ))}

      </div>

      <div className="close-modal" onClick={() => dispatch({ type: context_act.CLOSE_CONTEXT })}>
        X
      </div>
    </>
  );
}