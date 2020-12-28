import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { postSongs, getSearchedSongUrl } from '../actions/actions'
import { Spinner, HoverPlus, HoverPlaylist } from './active_svgs'
import { ent_act } from '../reducers/root_reducer';
import { ytdlAPI } from './search_box'
import { CardDiv, Equalizer} from './card'


const ButtonDiv = styled.div`
  cursor: pointer;
  
  color: ${props => props.color};
  &:hover {
    color: ${props => props.hoverColor};
  }
  &:hover svg{
    fill:${props => props.hoverColor};
  }
  svg{
    margin:auto auto;
    fill:${props => props.color};
  }
`;
const hoverColors = {
  color: "grey",
  hoverColor: "#ad0f37"
}
const AddIcon = ({ playlist, added, adding, addSong }) => {
  if (added) {
    return <div></div>
  } else {
    if (adding) {
      return <div><Spinner size={22} color="#ad0f37" /></div>
    } else if (playlist) {
      return <ButtonDiv {...hoverColors} onClick={addSong}>
        <HoverPlaylist scale="1" size="22px" />
      </ButtonDiv>
    } else {
      return <ButtonDiv {...hoverColors} onClick={addSong}>
        <HoverPlus scale="1" size="20px" />
      </ButtonDiv>
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
function parse_str(str) {
  return str.split('&').reduce(function (params, param) {
    var paramSplit = param.split('=').map(function (value) {
      return decodeURIComponent(value.replace('+', ' '));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
}


export default function SearchResultsD() {
  const [adding, setAdding] = useState(null)
  const dispatch = useDispatch()
  const search = useSelector(state => state.entities.search)
  const yt_id_set = useSelector(state => state.entities.songD.yt_id_set)
  const err = useSelector(state => state.errors.search)

  const track = useSelector(state => state.player.track)
  const playing = useSelector(state => state.player.playing)

  const addSong = (url, idx) => async (e) => {
    setAdding(Object.assign([], adding, { [idx]: true }))
    const resp = await fetch(ytdlAPI + '?add=' + url)
    const json = await resp.json();
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
      onClick={(e) => {
        e.stopPropagation()

      }}
    >

      {search.loading && <Spinner size={50} color="#ad0f37" />}
      {(!search.search_results || !search.search_results.length) && !search.loading &&
        <span className="disclaimer">Disclaimer: I condone only adding music that you own or ones that are royalty-free.</span>
      }

      { search.search_results && search.search_results.map((e, idx) => (
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


