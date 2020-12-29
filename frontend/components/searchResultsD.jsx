import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'
import { Spinner, HoverPlus, HoverPlaylist } from './active_svgs'
import { ent_act } from '../reducers/root_reducer';
import { ytdlAPI } from './search_box'
import { CardDiv, Equalizer} from './card'


const AddIcon = ({ playlist, added, adding, addSong }) => {
  if (added) {
    return <div></div>
  } else {
    if (adding) {
      return <div><Spinner size={22} color="#ad0f37" /></div>
    } else if (playlist) {
      return <HoverPlaylist {...{ scale:.6, width: "40px", height: "60px" }} onClick={addSong}/>
    } else {
        return <HoverPlus {...{ scale:.45, width: "40px", height: "60px" }} onClick={addSong}/>
    }
  }
}


const SearchResultsDiv = styled.div`
  position:relative;
  >svg, .disclaimer{
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }

  .disclaimer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default function SearchResultsD() {
  const [adding, setAdding] = useState(null)
  const dispatch = useDispatch()
  const playlistD = useSelector(state => state.entities.playlistD)
  const yt_id_set = useSelector(state => state.entities.songD.yt_id_set)
  const err = useSelector(state => state.errors.searchErrors)

  const track = useSelector(state => state.player.track)
  const playing = useSelector(state => state.player.playing)

  const addSong = (url, idx) => async (e) => {
    e.stopPropagation()
    setAdding(Object.assign([], adding, { [idx]: true }))
    const resp = await fetch(ytdlAPI + '?add=' + url)
    const json = await resp.json();
    if (json.Key) {
      dispatch(postSongs([[json.Key, json.yt_id]]))
    } else {
      dispatch({ type: ent_act.RECEIVE_SEARCH_RESULTS, search_term: playlistD.search_term, search_results: json })
      setAdding(new Array(json.length).fill(false))
    }
  }
  useEffect(() => {
    setAdding(playlistD.search_results && new Array(playlistD.search_results.length).fill(false))
  }, [playlistD.search_results])

  return (
    <SearchResultsDiv className="scrollable">

      {playlistD.loading && <Spinner size={50} color="#ad0f37" />}
      {(!playlistD.search_results || !playlistD.search_results.length) && !playlistD.loading &&
        <span className="disclaimer">Disclaimer: I condone only adding music that you own or ones that are royalty-free.</span>
      }

      { playlistD.search_results && playlistD.search_results.map((e, idx) => (
        <CardDiv key={idx}
          onClick={
            () => {
              dispatch({ type: ent_act.LOAD_TRACK, track: ['search_results', idx] })
              dispatch({ type: ent_act.SET_PLAY })
            }
          }
        >
          <div className='drag-handle'>
            <Equalizer
              track={track}
              pl_id='search_results'
              index={idx}
              playing={playing}
            />
          </div>
          <div>
            <div></div>
            <div>{e.title}</div>
          </div>
          <div>
            <AddIcon playlist={e.type === "playlist"} addSong={addSong(e.url, idx)} added={yt_id_set && yt_id_set.has(e.id)} adding={adding && adding[idx]} />
          </div>
        </CardDiv>
      ))}

      <div className='holder error-holder'>
        {err.map((mes, i) => (
          <div key={i}>
            {mes}
          </div>
        ))}
      </div>

    </SearchResultsDiv>
  )
};


