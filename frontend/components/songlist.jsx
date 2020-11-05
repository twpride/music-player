
import { connect, useDispatch } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';

import {getSongs} from './actions'


export default function SongList() {


  useEffect(() => {
    getSongs()
  },[])

  // const [state, setState] = useState({email: '', password: ''})

  const useLegacyState = initialState => useReducer(
    (state, update) => ({ ...state, ...update }),
    initialState
  );

  const initState = {
    title: "hello",
    artist: "this",
    album: "is a test",
    waveform: null
  };

  const [state, setState] = useLegacyState(initState);

  const update = field => e => setState({
    [field]: e.currentTarget.value
  });

  window.yyy = state
  const loadSong = e => {
    let reader = new FileReader();
    const music = e.currentTarget.files[0]

    reader.onload = e => {
      const audioEle = document.createElement('audio');
      audioEle.src = e.target.result
      window.xxx = audioEle.src
    };

    if (music) {
      reader.readAsDataURL(music)
    }

    setState({ waveform: music })
  }

  const submitSong = e => {
    e.preventDefault();
    // console.log(this.uploadButton.current)
    // this.uploadButton.current.disabled = true;

    setState({ uploading: true })

    const myForm = document.getElementById('songForm');
    const formData = new FormData(myForm);
    console.log("submitsong")
    console.log(myForm)
    createSong(formData)
  }


  return (
    <div>
      Song list bro
    </div>
  )
};












