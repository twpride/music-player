import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';

import styled from 'styled-components'
import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import editIcon from '../icons/edit.svg'
import addToPlaylist from '../icons/addToPlaylist.svg'
import deleteIcon from '../icons/delete.svg'
import { deleteTrack, deleteSong } from '../util/api_util'
import { BurgerDiv } from './contextMenu'

const PlaylistBurger = styled(props => <BurgerDiv {...props} />)` 

  .song-info {
    display: flex;
    flex-direction: column;
    div:nth-child(1) {
      color: #777777;
    }
  }
`;

export default function SongBurger() {

  const dispatch = useDispatch();
  const songD = useSelector(state => state.entities.songD)
  const contextMenu = useSelector(state => state.ui.contextMenu)
  const playlistD = useSelector(state => state.entities.playlistD)
  const track = useSelector(state => state.player.track)

  const burgerList = {
    "Edit song": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.SONG_EDIT_C })
    },
    "Add to playlist": (e) => {
      e.stopPropagation()
      dispatch({ type: context_act.SELECT_PLAYLIST_C, id: contextMenu.song_id })
    },
    "Remove from playlist": (e) => {
      e.stopPropagation()
      // Each row in playlist is Entry instance, Entry schema "song_id", "Entry_pk","prev_id"
      const playlist = playlistD[contextMenu.playlist_id]
      const tracks = [playlist[contextMenu.index][1]]
      deleteTrack(tracks)

      if (track) {
        let newtr = [...track];
        if (contextMenu.playlist_id == track[0]) {
          if (contextMenu.index < track[1]) {
            newtr[1] -= 1
          }
          else if (contextMenu.index == track[1] &&
            contextMenu.index == playlistD[track[0]].length - 1) {
            newtr = null;
          }
        }
        dispatch({
          type: ent_act.REMOVE_FROM_PLAYLIST,
          idx: contextMenu.index,
          pl_id: contextMenu.playlist_id,
          track: newtr
        })
      } else {
        dispatch({
          type: ent_act.REMOVE_FROM_PLAYLIST,
          idx: contextMenu.index,
          pl_id: contextMenu.playlist_id,
        })
      }


      dispatch({ type: context_act.CLOSE_CONTEXT })
    },
    "Delete song": async (e) => {
      e.stopPropagation()
      const song_id = contextMenu.song_id;
      const active_pls = []
      if (contextMenu.playlist_id[0]!='s') active_pls.push(contextMenu.playlist_id)

      if (track) {
        if (track[0][0]!='s' && contextMenu.playlist_id != track[0]) active_pls.push(track[0])
        else {
          let newtr = [...track];
          if (contextMenu.index < track[1]) {
            newtr[1] -= 1
          }
          else if (contextMenu.index == track[1] && contextMenu.index == Object.values(songD).length - 1) {
            newtr = null;
          }

          dispatch({ type: ent_act.DELETE_SONG, song_id, track: newtr })
        }
      } else {
        dispatch({ type: ent_act.DELETE_SONG, song_id })
      }

      dispatch({ type: context_act.CLOSE_CONTEXT })
      const resp = await deleteSong(song_id, active_pls)
      const json = await resp.json()

      json.fetched_pls.forEach((playlist, idx) => {
        const playlist_id = active_pls[idx];
        if (track && track[0] == playlist_id) {
          let nbef = 0
          // count how many deleted songs before current active track
          // track schema: [0]:playlist_id, [1]:order
          // cur_pl.entries schema: [0]: order, [1][0]: song_id, [1][1]:entry_id
          const cur_pl = playlistD[track[0]]
          for (let i of cur_pl.entries()) {
            if (i[0] == track[1]) {
              let newtr = [...track];
              newtr[1] -= nbef;
              if (newtr[1] >= playlist.length) {
                newtr = null;
              }
              dispatch({ type: ent_act.RECEIVE_PLAYLIST, track: newtr, playlist_id, playlist })
              break
            }
            if (i[1][0] == song_id) nbef += 1
          }
        } else {
          dispatch({ type: ent_act.RECEIVE_PLAYLIST, playlist_id, playlist })
        }
      })

      const pls_to_reset = json.dirty_pls.filter(ent => !active_pls.includes(ent.toString()))
      dispatch({ type: ent_act.RESET_PLAYLISTS, pls_to_reset })
    },
  }
  const icons = [
    editIcon, addToPlaylist, deleteIcon, deleteIcon
  ]

  if (contextMenu.playlist_id[0]=='s') {
    delete burgerList['Remove from playlist'];
    icons.splice(2, 1);
  }

  return (
    <PlaylistBurger>
      <div className='context-header'>
        <div className='song-info'>
          <div>{songD[contextMenu.song_id].artist}</div>
          <div>{songD[contextMenu.song_id].title}</div>
        </div>
        <div>{(new Date(Date.parse(songD[contextMenu.song_id].date_added))).toLocaleDateString()}</div>
      </div>
      {Object.entries(burgerList).map(([name, cb], i) => (
        <div key={i} onClick={cb} className="burger-row">
          <img src={icons[i]} />
          <div className="burger-text">
            {name}
          </div>
        </div>
      ))}
    </PlaylistBurger>
  );
}