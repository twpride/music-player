import { connect, useDispatch} from 'react-redux';

import React, { useState, useReducer, useEffect} from 'react';

import './intro.css'
import { createSong } from './actions'

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


const useLegacyState = initialState => useReducer(
  (state, update) => ({ ...state, ...update }),
  initialState
);

const Intro = ({ logout, openModal, createSong }) => {

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
    createSong(formData)
  }

    


  return (
    <div>
      <form id="songForm" onSubmit={submitSong}>
        <input type="file" name="waveform" onChange={loadSong} multiple></input>
        <div className="login-input">
          <div>Title</div>
          <input type="text"
            name="title"
            value={state.title}
            onChange={update('title')}
          />
        </div>
        <div className="login-input">
          <div>Artist</div>
          <input type="text"
            name="artist"
            value={state.artist}
            onChange={update('artist')}
          />
        </div>
        <div className="login-input">
          <div>Album</div>
          <input type="text"
            name="album"
            value={state.album}
            onChange={update('album')}
          />
        </div>
        {/* {this.renderErrors()} */}
        <input className="submit-button"
          type="submit"
          value="Upload"
        />
      </form>
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
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);
















