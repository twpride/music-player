import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'
import { getPostUrls } from '../util/api_util'
import Spinner from './spinner'
import { context_act } from '../reducers/ui_reducer'

const ytdlAPI = "https://9fm8fonkk8.execute-api.us-west-1.amazonaws.com/test/?url="
// const ytdlAPI = "https://kp31ynjvnj.execute-api.us-west-1.amazonaws.com/test/?url="
// const ytdlAPI = "https://adtk67yvyl.execute-api.us-west-1.amazonaws.com/test/?url="

const UploadFormEle = styled.form`
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  width: min(500px, 80%);
  height: 300px;
  margin: auto auto;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color:white;
  label {
    color:#ad0f37; 
    border: 1px solid #ad0f37;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  #file-count {
    font-size:8px;
  }
  #textbox-holder {
    height:57px;
    margin-bottom: 1em;
  }
  textarea {
    resize: none;
    height: 19px;
    width: 20em;
    overflow-x: hidden;
    overflow-y: hidden;
    border: 0;
    border-bottom: 1px solid lightgrey;
    outline: none; 
  }
  textarea:focus {
    border-color:#333;
  }
  .button-box {
    display:flex;
    font-size:1em;
  }
  div.or {
    color:black;
    height: 4em;
    display:flex;
    align-items:center;
  }
  span.divider {
    width: 40px;
    height: 1px;
    margin: 0 16px;
    background-color: lightgrey;
  }
  textarea::placeholder {
    text-align: center;
    color: greyscale(0.4);
  }
`


export default function UploadForm() {
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const form = useRef(null)
  const dispatch = useDispatch()
  const [filelist, setFilelist] = useState([]);

  const loadSong = e => {
    setFilelist(e.currentTarget.files)
  }

  const submitSong = async e => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData(form.current);

    //upload local songs
    const waveforms = formData.getAll('waveform')
    const localFiles = waveforms.map(ent => ent.name).filter(ent => ent) // if no files return empty array
    if (localFiles.length) {
      try {
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
      } catch (err) {
        setErrors(state => [...state, err.message])
      }
    }

    // scrape youtube songs
    const urlsArray = urls.split("\n").filter(ent => ent) //filter blank lines
    const songs = await Promise.all(
      urlsArray.map(async url => {
        console.log(url)
        const resp = await fetch(ytdlAPI + url)
        const json = await resp.json();
        if (!resp.ok) {
          setErrors(state => [...state, json])
        }
        return json
      })
    )
    const ytFiles = songs.map(ent => ent.Key).filter(ent => ent) //filter failed reqs

    const files = Array.concat(localFiles, ytFiles)
    if (files.length) dispatch(postSongs(files))
    if (!errors.length) dispatch({ type: context_act.CLOSE_CONTEXT })
    setLoading(false)
  }

  function onTextChange(e) {
    setUrls(e.currentTarget.value)
    const nLine = (e.currentTarget.value.match(/\n/g) || []).length + 1;
    if (nLine > 3) {
      e.currentTarget.style.overflowY = "scroll"
      e.currentTarget.style.height = 19 * 3 + 2;
    } else {
      e.currentTarget.style.height = (nLine * 19 + 2) + "px";
      e.currentTarget.style.overflowY = "hidden"
    }
  }

  return (
    <UploadFormEle id="songForm" ref={form} onSubmit={submitSong} onClick={(e) => e.stopPropagation()}>
      <input type="file" name="waveform"
        onChange={loadSong} multiple hidden id='choose-file' />
      <label htmlFor='choose-file'>
        {filelist.length > 0 ? `${filelist.length} selected` : "Choose files"}
      </label>
      <div className='or'><span className='divider'></span>or<span className='divider'></span></div>
      <div id="textbox-holder">
        <textarea type="text"
          name="url"
          value={urls}
          placeholder="Paste YouTube URLs (1 per line)"
          onChange={onTextChange}
          wrap="off"
        />
      </div>
      {loading ? <Spinner /> :
        <input className="submit-button"
          type="submit"
          value="Submit"
        />
      }
      <div className='errors'>
        {errors.map((mes, i) => {
          <div key={i}>
            {mes}
          </div>
        })}
      </div>
    </UploadFormEle>
  )
};


