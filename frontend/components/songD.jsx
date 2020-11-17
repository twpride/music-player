
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';
import burgerIcon from './icons/burger.svg'
import { getSongUrl } from './actions'

const Table = styled.table`
  font-size: .9em;
  font-family: Sans-Serif;
  border-collapse: collapse;
  tr {
    &:hover {
      background-color: #F0F0F0;
    }
  }
  
  td {
    height: 4em;
    padding: 0 .45em 0 .45em;
    &:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:nth-child(2) {
      max-width: 23em;
      overflow:hidden;
      white-space: nowrap;
      div:nth-child(1) {
        color: #606060
      }
      div:nth-child(2) {
      }
    }
    &:nth-child(3) {
      padding-left: 1em;
    }
  }
`

export default function SongD() {
  const dispatch = useDispatch();
  const playSong = (e) => {
    dispatch(getSongUrl(e))
  }
  const songD = useSelector(state => state.entities.songD)

  return (
    <Table>
      <tbody>
        {Object.values(songD).map((song, i) => (
          <tr key={i} onDoubleClick={() => playSong(song.id)}>
            <td>{i}</td>
            <td>
              <div>{song.artist}&nbsp;</div>
              <div>{song.title}&nbsp;</div>
            </td>
            <td><img src={burgerIcon} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};












