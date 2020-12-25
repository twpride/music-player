import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'
import { Spinner, HoverPlus, HoverPlaylist } from './active_svgs'
import xIcon from '../icons/x.svg'
import { ent_act } from '../reducers/root_reducer';
import { error_act } from '../reducers/errors_reducer';
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


const SearchBoxDiv = styled.div`

    display:flex;
    flex-direction:row;
    width: 400px;
    position:absolute;
    top: 15px;
    left:0;
    right:0;
    margin:auto;
    z-index:5;
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

`


export default function SearchBox() {
  const tboxRef = useRef(null)
  const dispatch = useDispatch()
  const search = useSelector(state => state.entities.search)
  const [urls, setUrls] = useState(search.search_term);

  const submitSong = async e => {

    e.preventDefault();
    dispatch({type:ent_act.SET_LOADING, status:true})
    const errorsArr = []

    // scrape youtube songs
    const urlsArray = urls ? urls.split("\n").filter(ent => ent) : []//filter blank lines

    const songs = await Promise.all(
      urlsArray.map(async url => {
        // console.log('querying:' + rl)
        const resp = await fetch(ytdlAPI + '?add=' + url)
        const json = await resp.json();
        if (!resp.ok) {
          errorsArr.push(json)
          // console.log("fail")
        }
        return json
      })
    )
    if (!songs.length || songs[0].Key || errorsArr.length) {
      const ytFiles = songs.map(ent => [ent.Key, ent.yt_id]).filter(ent => ent[0]) //filter failed reqs

      if (ytFiles.length) dispatch(postSongs(ytFiles))

      if (errorsArr.length) {
        dispatch({type:error_act.RECEIVE_SEARCH_ERRORS, errors:errorsArr})
      } else {
        setUrls('')
      }
    } else {
      const search_results = songs[0].map(e => ({ id: e.id, title: e.title, type: e.type, url: e.url })).filter(e => e.type === "video" || e.type === "playlist")
      dispatch({ type: ent_act.RECEIVE_SEARCH_RESULTS, search_term: urls, search_results })
      console.log(songs[0])
    }
    dispatch({type:ent_act.SET_LOADING, status:false})
  }

  function onTextChange(e) {
    const tbox = tboxRef.current;
    setUrls(tbox.value)
    // const nLine = (tbox.value.match(/\n/g) || []).length + 1;
    // if (nLine > 3) {
    //   tbox.style.overflowY = "scroll"
    //   tbox.style.height = (19 * 3 + 2) + 'px';
    // } else {
    //   tbox.style.height = (nLine * 19 + 2) + 'px';
    //   tbox.style.overflowY = "hidden"
    // }
  }

  return (
    <SearchBoxDiv onSubmit={submitSong}
      onClick={(e) => e.stopPropagation()}
    >
      <textarea type="text"
        name="url"
        value={urls}
        placeholder="Search song, album, artist"
        onChange={onTextChange}
        onKeyDown={(e) => { if (e.key === 'Enter') submitSong(e) }}
        wrap="off"
        ref={tboxRef}
      />
      <img src={xIcon} onClick={e => {
        dispatch({ type: ent_act.CLEAR_SEARCH_RESULTS })
        setUrls('')
      }} />

    </SearchBoxDiv>
  )
};


