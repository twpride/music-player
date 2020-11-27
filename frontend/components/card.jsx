import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { context_act } from '../reducers/ui_reducer'
import { CardDiv } from './songD'

import dragIcon from '../icons/draghandle.svg';
import burgerIcon from '../icons/burger.svg';

export const Card = ({ id, text, index, moveCard, setPrev, playSong, song_id, playlist_id }) => {

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

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'card', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin() {
      setStart(index)
    },
    end() {
      console.log(start)
      console.log(index)
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
        className='noselect'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }} >{index + 1}</div>
      <div>
        <div>{text && text.artist}&nbsp;</div>
        <div>{text && text.title}&nbsp;</div>
      </div>

      <div onClick={launchBurger(song_id)}>
        <img src={burgerIcon} />
      </div>
    </CardDiv>
  )
}
