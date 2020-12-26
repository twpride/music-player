import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { context_act } from '../reducers/ui_reducer'
import styled from 'styled-components'
import PlayingIcon from '../icons/playing.gif'
import PausedIcon from '../icons/paused.gif'

function preventDrag(e) {
  e.preventDefault()
  e.stopPropagation()
}

const CardDiv = styled.div`
  font-size: .9em;
  display:flex;
  flex-direction:row;
  align-items: center;
  @media (hover: hover) {
    &:hover {
        background-color: #F0F0F0;
    }
  }

  >div {
    height: 4em;
    opacity: ${props => props.isDragging ? 0.4 : 1};

    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      overflow:hidden;
      white-space: nowrap;
      div:nth-child(1) {
        color: #777777;
      }
    }

    &:not(:nth-child(2)) {
      min-width:3em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    &:nth-of-type(3) {
      margin-left: auto;
    }
  }
  img.equalizer {
    height:14px;
  }

  .drag-handle{
    cursor: move;
    user-select: none;
  }
  cursor: pointer;

`

const Equalizer = ({ track, pl_id, index, playing }) => {
  if (track && track[0] === pl_id && track[1] === index) {
    if (playing) {
      return <img className='equalizer' src={PlayingIcon}
        onDragStart={preventDrag}
      ></img>
    } else {
      return <img className='equalizer' src={PausedIcon}
        onDragStart={preventDrag}
      ></img>
    }
  } else return index + 1
}


import burgerIcon from '../icons/burger.svg';

export const Card = ({ id, text, index, moveCard, setPrev, playSong, song_id, playlist_id }) => {

  const track = useSelector(state => state.player.track)
  const playing = useSelector(state => state.player.playing)
  const dispatch = useDispatch();
  const ref = useRef(null)
  const [start, setStart] = useState(null)

  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin() {
      setStart(index)
    },
    end() {
      // console.log(start)
      // console.log(index)
      setPrev(start, index)
    }
  })

  drag(drop(ref))

  const launchBurger = (id) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: context_act.SONG_BURGER_C, song_id, playlist_id, index })
  }

  return (
    <CardDiv isDragging={isDragging} onClick={playSong} >
      <div ref={ref}
        className='drag-handle'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }} >
        <Equalizer
          track={track}
          pl_id={playlist_id}
          index={index}
          playing={playing}
        />
      </div>
      <div>
        <div>{text && text.artist}</div>
        <div>{text && text.title}</div>
      </div>

      <div onClick={launchBurger(song_id)}>
        <img src={burgerIcon} />
      </div>
    </CardDiv>
  )
}
