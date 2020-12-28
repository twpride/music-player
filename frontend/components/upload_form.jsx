import React, { useState, useRef } from 'react';
import { useDispatch} from 'react-redux';
import { postSongs } from '../actions/actions'
import { getPostUrls } from '../util/api_util'
import { Spinner, UploadIcon} from './active_svgs'

import { context_act } from '../reducers/root_reducer'

const svgSize = {
  scale: 0.9,
  size: "24px",
}

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
    dispatch({ type: context_act.CLOSE_CONTEXT })
  }

  return (
    <form ref={form}>
      <input type="file" name="waveform"
        onChange={submitSong} multiple hidden id='choose-file' />
      <label htmlFor='choose-file' className="row">
        {loading ?
          <Spinner size={24} color="black" />
          :
          <UploadIcon {...svgSize} />
        }
        <div className="burger-text">Upload Songs</div>
      </label>
    </form>
  )
};


