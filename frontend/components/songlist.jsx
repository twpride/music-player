
import { connect, useDispatch, useSelector } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';

import { getSongUrl } from './actions'
import { addToPlaylist} from './api_util'
import styled from 'styled-components'

export default function SongList() {

  const dispatch = useDispatch();

  const playSong = (e) => {
    console.log(e)
    dispatch(getSongUrl(e))
  }

  // const addSong = () => {
  //
  //   addToPlaylist()
  // }

  const songs = useSelector(state => state.entities.songs)

  return (
    <table>
      <tbody>
        {songs.map(song => (
          <tr key={song[0]} onClick={() => playSong(song[0])}>
            {song.map((col, i) => (
              <td key={i}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
};












