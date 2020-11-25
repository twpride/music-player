import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { postSongs } from '../actions/actions'

import {HeaderDiv} from './app'
const ytdlAPI = "https://9fm8fonkk8.execute-api.us-west-1.amazonaws.com/test/?url="

export default function UploadForm() {

  const [urls, setUrls] = useState('');
  const dispatch = useDispatch()

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

    dispatch(postSongs(songs))
  }

  return (
    <>
    <HeaderDiv>
    <div className="title">Upload Songs</div>
    </HeaderDiv>
    <div className='scrollable'>
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
    </>
  )
};


