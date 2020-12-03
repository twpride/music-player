import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'
import { createSongs } from '../util/api_util'
import { getPostUrls } from '../util/api_util'
import Header from './header'
// const ytdlAPI = "https://9fm8fonkk8.execute-api.us-west-1.amazonaws.com/test/?url="
// const ytdlAPI = "https://kp31ynjvnj.execute-api.us-west-1.amazonaws.com/test/?url="
const ytdlAPI = "https://adtk67yvyl.execute-api.us-west-1.amazonaws.com/test/?url="

const UploadFormDiv = styled.div`
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;

  max-width:500px;
  height: 300px;
  margin: auto auto;
  background-color:beige;

  form {
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin: 0em 0.5em;
    textarea {
      resize: none;
      height:4.5em;
    }

    .button-box {
      display:flex;
      font-size:1em;
    }
    >div {
      height: 4em;
    }
  }
`

export default function UploadForm() {

  const [urls, setUrls] = useState('');
  const form = useRef(null)
  const dispatch = useDispatch()

  const loadSong = e => {
    const music = e.currentTarget.files[0]
  }

  const submitSong = async e => {
    e.preventDefault();
    const formData = new FormData(form.current);

    //upload local songs
    const waveforms = formData.getAll('waveform')
    const localFiles = waveforms.map(ent => ent.name).filter(ent => ent) // if no files return empty array

    if (localFiles.length) {
      const signedUrls = await getPostUrls(localFiles).then(
        res => res.json()
      )
      await Promise.all(
        signedUrls.map(async (url, idx) => {

          const ul = new FormData()
          for (let key in url.fields) {
            ul.append(key, url.fields[key]);
          }
          ul.append('file', waveforms[idx])

          await fetch(url.url, {
            method: 'POST',
            body: ul,
          });
        })
      )
    }

    // scrape youtube songs
    const urlsArray = urls.split("\n").filter(ent => ent) //filter blank lines
    const songs = await Promise.all(
      urlsArray.map(async url => {
        console.log(url)
        const resp = await fetch(ytdlAPI + url)
        const json = await resp.json();
        if (!resp.ok) console.log(json)
        return json
      })
    )
    const ytFiles = songs.map(ent => ent.Key).filter(ent => ent) //filter failed reqs

    const files = Array.concat(localFiles, ytFiles)
    if (files.length) dispatch(postSongs(Array.concat(localFiles, ytFiles)))
  }

  return (
    <UploadFormDiv onClick={(e) => e.stopPropagation()}>
      <div>Upload Songs</div>
      <br></br>
      <form id="songForm" ref={form} onSubmit={submitSong}>
        <input type="file" name="waveform" onChange={loadSong} multiple></input>
        <textarea type="text"
          name="url"
          value={urls}
          placeholder="https://www.youtube.com/watch?v=....."
          onChange={e => setUrls(e.currentTarget.value)}
          wrap="hard"
        />
        {/* {this.renderErrors()} */}
        <div className='button-box'>
          <input className="submit-button"
            type="submit"
            value="Upload"
          />
        </div>
      </form>
    </UploadFormDiv>
  )
};


