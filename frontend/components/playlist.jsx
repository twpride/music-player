
import { connect, useDispatch, useSelector } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';

import { getSongUrl, getPlaylist } from './actions'
import { addToPlaylist} from './api_util'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

export default function Playlist() {
  let { id } = useParams();
  
  const dispatch = useDispatch();

  const playSong = (e) => {
    dispatch(getSongUrl(e))
  }

  // const addSong = () => {
  //   addToPlaylist()
  // }
  const songs = useSelector(state => state.entities.songs)
  const playlist = useSelector(state => state.entities.playlists[id])

  useEffect( ()=> {
    if (!playlist) {
      dispatch(getPlaylist(id))
      console.log(playlist)
    }
  }, [])


  return (
    <table>
      <tbody>
        {playlist && playlist.map(track => (
          <tr key={track[0]} onClick={() => playSong(track[0])}>
            {track.map((col, i) => (
              <td key={i}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
};












