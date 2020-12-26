import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'
import { Spinner, HoverPlus, HoverPlaylist } from './active_svgs'
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


const SearchResultsDiv = styled.div`
  /* height:100%;
  position: relative;
  margin: auto auto;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color:white; */
  position:relative;
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
const SearchResRow = styled.div`
  font-size: 1em;
  display:flex;
  flex-direction:row;
  align-items: center;
  padding-left: 1.5em;
  >div {
    height:4em;
    display:flex;
    align-items:center;
  }
  >:last-child {
    margin-left: auto;
    min-width:3em;
    justify-content:center;
  }

`

export default function SearchResultsD() {
  const [adding, setAdding] = useState(null)
  const dispatch = useDispatch()
  const search = useSelector(state => state.entities.search)
  const err = useSelector(state => state.errors.search)

  const addSong = (url, idx) => async (e) => {
    setAdding(Object.assign([], adding, { [idx]: true }))
    const resp = await fetch(ytdlAPI + '?add=' + url)
    const json = await resp.json();
    console.log(json)
    if (json.Key) {
      dispatch(postSongs([[json.Key, json.yt_id]]))
    } else {
      dispatch({ type: ent_act.RECEIVE_SEARCH_RESULTS, search_term: search.search_term, search_results: json })
      setAdding(new Array(json.length).fill(false))
    }
  }
  useEffect(() => {
    setAdding(search.search_results && new Array(search.search_results.length).fill(false))
  }, [search.search_results])

  return (
    <SearchResultsDiv className="scrollable" 
      onClick={(e) => e.stopPropagation()}
    >
      {search.loading && <div className="spinner"><Spinner size={50} color="#ad0f37" /></div>}

      { search.search_results && search.search_results.map((e, idx) => (
        <SearchResRow key={idx}
        >
          <div>{e.title}</div>
          <AddIcon playlist={e.type === "playlist"} addSong={addSong(e.url, idx)} added={search.yt_id_set && search.yt_id_set.has(e.id)} adding={adding && adding[idx]} />
        </SearchResRow>
      ))}

      <div className='holder error-holder'>
        {err.map((mes, i) => (
          <div key={i}>
            {mes}
          </div>
        ))}
      </div>
      <div className="disclaimer">Disclaimer: I condone only adding music that you own or ones that are royalty-free.</div>
    </SearchResultsDiv>
  )
};


