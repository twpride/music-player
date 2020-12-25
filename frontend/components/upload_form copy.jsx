import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'
import { getPostUrls } from '../util/api_util'
import { Spinner, HoverPlus, HoverPlaylist } from './active_svgs'
import xIcon from '../icons/x.svg'
import UploadIcon from '../icons/upload.svg'
import { ent_act } from '../reducers/root_reducer';
const ytdlAPI = "https://9fm8fonkk8.execute-api.us-west-1.amazonaws.com/test/"
// const ytdlAPI = "https://kp31ynjvnj.execute-api.us-west-1.amazonaws.com/test/?url="
// const ytdlAPI = "https://adtk67yvyl.execute-api.us-west-1.amazonaws.com/test/?url="



const AddIcon = ({ playlist, added, adding, addSong }) => {
  if (added) {
    return <div></div>
  } else {
    if (adding) {
      return <div><Spinner size={20} color="#ad0f37" /></div>
    } else if (playlist) {
      return <div onClick={addSong}><HoverPlaylist size={24} color="grey" hoverColor="#ad0f37" /></div>
    } else {
      return <div onClick={addSong}><HoverPlus size={16} color="grey" hoverColor="#ad0f37" /></div>
    }
  }
}


const UploadFormEle = styled.form`
  /* height:100%;
  position: relative;
  margin: auto auto;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color:white; */
  label {
    color:#ad0f37; 
    cursor: pointer;
  }
  #file-count {
    font-size:8px;
  }
  input[type=text] {
    width:100%;
  }
  input[type=text]::placeholder {
    text-align: center;
  }
  textarea {
    resize: none;
    height: 19px;
    width: 100%;
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

  .holder {
    display:flex;
    flex-direction:row;
    /* width: min(20em,90%); */
    width: 400px;
    position:absolute;
    top: 15px;
    left:0;
    right:0;
    margin:auto;
    /* margin-left:auto; */
    /* margin-righst:auto; */
    z-index:5;
  }
  .error-holder {
    overflow-y:auto
  }
  input[type=submit] {
    padding:5px;
  }
  div.disclaimer {
    position:absolute;
    bottom:5px;
    font-size:10px;
  }
  .submit-button {
    height:50px;
  }

  div.spinner {
    position: absolute;
    margin: auto auto;
  }
`


export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState([]);
  const form = useRef(null)
  const dispatch = useDispatch()

  const submitSong = async e => {

    e.preventDefault();
    setLoading(true)
    const formData = new FormData(form.current);
    const errorsArr = []

    //upload local songs
    const waveforms = formData.getAll('waveform')
    const localFiles = waveforms.map(ent => [ent.name, null]).filter(ent => ent[0]) // if no files return empty array
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
        errorsArr.push(err.message)
      }
      dispatch(postSongs(localFiles))
    }

    setLoading(false)
  }

  return (
    <UploadFormEle className="scrollable" ref={form} onSubmit={submitSong}
      onClick={(e) => e.stopPropagation()}
    >
      {loading && <div className="spinner"><Spinner size={50} color="#ad0f37" /></div>}
      <input type="file" name="waveform"
        onChange={submitSong} multiple hidden id='choose-file' />
      <label htmlFor='choose-file'>
        <img src={UploadIcon}></img>
      </label>

    </UploadFormEle>
  )
};


