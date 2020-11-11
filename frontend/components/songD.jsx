
import { connect, useDispatch, useSelector } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';

import { getSongUrl } from './actions'
import { addToPlaylist} from './api_util'
import styled from 'styled-components'

export default function SongD() {

  const dispatch = useDispatch();

  const playSong = (e) => {
    console.log(e)
    dispatch(getSongUrl(e))
  }

  // const addSong = () => {
  //   addToPlaylist()
  // }

  const songD = useSelector(state => state.entities.songD)

  return (
    <table>
      <tbody>
        {Object.values(songD).map(song => (
          <tr key={song[0]} onClick={() => playSong(song[0])}>
            {Object.values(song).map((col, i) => (
              <td key={i}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
};












