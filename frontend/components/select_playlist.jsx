import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';
import styled from 'styled-components'

import {getPlaylist} from '../actions/actions'
import { addTrack } from '../util/api_util'
import { ent_act } from '../reducers/root_reducer';

const SelectDiv = styled.div`
  position:absolute;
  left:0;
  right: 0;
  bottom:0;
  background-color:white;
  display:flex;
  flex-direction: column;
  align-items:flex-start;

  .playlist-row {
    padding:0 1.5em;
    height:4em;
    font-size: 1em;
    display:flex;
    align-items: center;
    width:100%;
    cursor: pointer;
  }
  .playlist-row:hover {
    background-color: #F0F0F0;
  }
  .spacer {
    height: 1em;
  }
  .title {
    font-weight:700;
    padding:1.5em;
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
        if (!playlistD[playlist_id]) {
          dispatch(getPlaylist(playlist_id))
        } else {
          let prevId = null;
          if (playlistD[playlist_id] && playlistD[playlist_id].length) {
            const lastIdx = playlistD[playlist_id].length - 1;
            prevId = playlistD[playlist_id][lastIdx][1];
          }
          dispatch({
            type: ent_act.APPEND_PLAYLIST,
            playlist_id, tracks: [[contextMenu.song_id, entry_pk, prevId]]
          })
        }
      })
  }

  return (
    <SelectDiv>
      <div className="title">Add to playlist</div>
      {playlistD.playlistTitleD && Object.entries(playlistD.playlistTitleD).map((pl, index) => (
        <div key={index} className="playlist-row" onClick={clickAddTrack(pl[0])}>{pl[1]}</div>
      ))}

    </SelectDiv>
  );
}