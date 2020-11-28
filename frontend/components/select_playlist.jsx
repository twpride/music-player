import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';
import styled from 'styled-components'


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
  padding:1.5em;

  .playlist-row {
    /* font-size: 0.9em; */
    height:4em;
    font-size: 1em;
    display:flex;
    align-items: center;
    cursor: pointer;
  }
  .spacer {
    height: 1em;
  }
  .title {
    font-weight:700;
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
        if (playlistD[playlist_id] && playlistD[playlist_id].length) {
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
      <div className="spacer"></div>
      {playlistD.playlistTitleD && Object.values(playlistD.playlistTitleD).map((pl, index) => (
        <div key={index} className="playlist-row" onClick={clickAddTrack(pl.id)}>{pl.title}</div>
      ))}

    </SelectDiv>
  );
}