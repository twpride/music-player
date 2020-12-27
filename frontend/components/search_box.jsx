import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'
import { Spinner, HoverPlus, HoverPlaylist, XIcon } from './active_svgs'
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

    width: min(90%, 400px); ;
    height: 30px;

    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;

    border: 1px solid ${props => `${props.focus ? '#ad0f37' : 'rgba(120,120,120,0.5)'}`};
    border-radius: 15px;

    z-index:5;

    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;

    textarea {
      margin-left:15px;
      resize: none;
      height: 19px;
      width: 100%;
      overflow-x: hidden;
      overflow-y: hidden;
      border: 0;
      outline: none; 
    }
    div.xholder {
      width:22px;
      height:22px;
      margin-right:10px;
    } 
    svg {
      margin-right:10px;
      cursor: pointer;
    }

`


export default function SearchBox() {
  const tboxRef = useRef(null)
  const dispatch = useDispatch()
  const search = useSelector(state => state.entities.search)
  const [urls, setUrls] = useState(search.search_term);
  const [focus, setFocus] = useState(false);
  

  useEffect(()=>{
    tboxRef.current.focus();
  },[])
  
  const submitSong = async e => {

    e.preventDefault();
    dispatch({ type: ent_act.SET_LOADING, status: true })
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
        dispatch({ type: error_act.RECEIVE_SEARCH_ERRORS, errors: errorsArr })
      } else {
        setUrls('')
      }
    } else {
      const search_results = songs[0].map(e => ({ id: e.id, title: e.title, type: e.type, url: e.url })).filter(e => e.type === "video" || e.type === "playlist")
      dispatch({ type: ent_act.RECEIVE_SEARCH_RESULTS, search_term: urls, search_results })
    }
    dispatch({ type: ent_act.SET_LOADING, status: false })
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
      focus={focus}
    >
      <textarea type="text"
        name="url"
        value={urls}
        placeholder="Search song, album, artist"
        onChange={onTextChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={(e) => { if (e.key === 'Enter') submitSong(e) }}
        wrap="off"
        ref={tboxRef}
      />
      <div className='xholder' onClick={e => {
        dispatch({ type: ent_act.CLEAR_SEARCH_RESULTS })
        setUrls('')
      }}>
        {urls && urls.length &&
          <XIcon {...{ scale: 1, size: "22px" }}

          />
        }
      </div>

    </SearchBoxDiv>
  )
};


