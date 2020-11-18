import { connect, useDispatch } from 'react-redux';

import React, { useState, useReducer, useEffect } from 'react';

// import './intro.css'
import { postSongs } from './actions'
import { } from './api_util'

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

const ytdlAPI = "https://9fm8fonkk8.execute-api.us-west-1.amazonaws.com/test/?url="

const Intro = ({ logout, openModal, postSongs }) => {

  const [urls, setUrls] = useState('');

  const loadSong = e => {
    const music = e.currentTarget.files[0]
  }

  const submitSong = async e => {
    e.preventDefault();
    // console.log(this.uploadButton.current)
    // this.uploadButton.current.disabled = true;


    // const myForm = document.getElementById('songForm');
    // const formData = new FormData(myForm);
    // createSong(formData)
    const urlsArray = urls.split("\n")

    const songs = await Promise.all(
      urlsArray.map(async url => {
        const resp = await fetch(ytdlAPI + url)
        const json = await resp.json();
        return json
      })
    )

    postSongs(songs)
  }




  return (
    <div>
      <form id="songForm" onSubmit={submitSong}>
        <input type="file" name="waveform" onChange={loadSong} multiple></input>

        <div className="login-input">
          <div>Url</div>
          <textarea type="text"
            name="url"
            value={urls}
            onChange={e => setUrls(e.currentTarget.value)}
            rows="5" cols="43" wrap="hard"
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
  postSongs: (songs) => dispatch(postSongs(songs)),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);
















