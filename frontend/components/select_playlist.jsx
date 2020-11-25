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

const SelectDiv = styled.div`
  position:absolute;
  left:0;
  right: 0;
  bottom:0;
  background-color:white;
  display:flex;
  flex-direction: column;
  align-items:center;
  .playlist-row {
    padding: 1em 1em;
    font-size: 0.9em;
  }

`




export default function SelectPlaylist() {

  const dispatch = useDispatch();

  const playlistD = useSelector(state => state.entities.playlistD)
  const contextMenu = useSelector(state => state.ui.contextMenu)

  const clickAddTrack = (playlist_id) => (e) => {
    e.preventDefault();
    // Entry schema "song_id", "Entry_pk","prev_id"
    addTrack(playlist_id, contextMenu.song_id)
      .then(res => res.json()) // Entry_pk of added track
      .then(entry_pk => {
        let prevId = null;
        if (playlistD[playlist_id].length) {
          const lastIdx = playlistD[playlist_id].length - 1;
          prevId = playlistD[playlist_id][lastIdx][1];
        }

        dispatch({
          type: ent_act.APPEND_PLAYLIST,
          playlist_id, tracks: [[contextMenu.song_id, entry_pk, prevId]]
        })
      })
  }

  return (
    <SelectDiv>
      <div className="title">Add to playlist</div>

      {playlistD.playlistTitleD && Object.values(playlistD.playlistTitleD).map((pl, index) => (
        <div key={index} className="playlist-row" onClick={clickAddTrack(pl.id)}>{pl.title}</div>
      ))}

    </SelectDiv>
  );
}