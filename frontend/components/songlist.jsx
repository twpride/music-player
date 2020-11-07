
import { connect, useDispatch, useSelector } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';

import styled from 'styled-components'



import {getSongs} from './actions';


export default function SongList() {
  // const [store, dispatch] = useReducer([])
  // const [state, setState] = useState({email: '', password: ''})

  // const useLegacyState = initialState => useReducer(
  //   (state, update) => ({ ...state, ...update }),
  //   initialState
  // );

  // const initState = {
  //   title: "hello",
  //   artist: "this",
  //   album: "is a test",
  //   waveform: null
  // };

  // const [state, setState] = useLegacyState(initState);

  // const update = field => e => setState({
  //   [field]: e.currentTarget.value
  // });

  // window.yyy = state
  // const loadSong = e => {
  //   let reader = new FileReader();
  //   const music = e.currentTarget.files[0]

  //   reader.onload = e => {
  //     const audioEle = document.createElement('audio');
  //     audioEle.src = e.target.result
  //     window.xxx = audioEle.src
  //   };

  //   if (music) {
  //     reader.readAsDataURL(music)
  //   }

  //   setState({ waveform: music })
  // }

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getSongs())
  // }, [])

  const songs = useSelector(state => state.entities.songs)

  return (
    <div>hello</div>
    // <table>
    //   <tbody>
    //     {songs.map(song => (
    //       <tr key={song[0].toString()}>
    //         {song.map((col, i) => (
    //           <td key={i}>{col}</td>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  )
};












