
import { connect } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';

import { createSong, getSongs} from './actions'

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';




const SongList = ({ logout, openModal, createSong, getSongs }) => {


  useEffect(() => {
    getSongs()
  },[])







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
    console.log(myForm)
    console.log(formData.keys())
    createSong(formData)
  }


  return (
    <div>
      Song list bro
    </div>
  )
};

const mapStateToProps = ({ entities }) => ({
  // currentUser: session.currentUser
  menu: entities.menu
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  createSong: (song) => dispatch(createSong(song)),
  getSongs: () => dispatch(getSongs()),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongList);
















