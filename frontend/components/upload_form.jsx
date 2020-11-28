import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'

import Header from './header'
// const ytdlAPI = "https://9fm8fonkk8.execute-api.us-west-1.amazonaws.com/test/?url="
const ytdlAPI = "https://kp31ynjvnj.execute-api.us-west-1.amazonaws.com/test/?url="

const UploadFormEle = styled.form`
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin: 1em 1.5em;
  textarea {
    resize: none;
  }
  input[type=submit], button{
    cursor:pointer;
    background-color: white;
    border: 0;
    padding: 0;
    color: #CE1141;
    font-size: 1em;
  }
  .button-box {
    display:flex;
  }
  >div {
    height: 4em;
  }
`

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
      <Header title='Upload Songs' />
      <div className='scrollable'>
        <UploadFormEle id="songForm" onSubmit={submitSong}>
          {/* <input type="file" name="waveform" onChange={loadSong} multiple></input> */}
          <textarea type="text"
            name="url"
            value={urls}
            placeholder="Youtube URLs"
            onChange={e => setUrls(e.currentTarget.value)}
            rows="5" wrap="hard"
          />
          {/* {this.renderErrors()} */}
          <div className='button-box'>
            <input className="submit-button"
              type="submit"
              value="Upload"
            />
          </div>
        </UploadFormEle>
      </div>
    </>
  )
};


