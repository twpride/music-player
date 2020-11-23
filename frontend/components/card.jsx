import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import burgerIcon from '../icons/burger.svg'
import dragHandle from '../icons/draghandle.svg'
import { context_act } from '../reducers/ui_reducer'

import {CardDiv} from './songD'
import {MdDragHandle} from 'react-icons/md'

export const Card = ({ id, text, index, moveCard, setPrev, playSong, song_id, draggable }) => {
  
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
    },
    canDrag: () => draggable
  })

  drag(drop(ref))

  const launchBurger = (id) => (e) => {
    if (draggable) return
    e.stopPropagation()
    dispatch({ type: context_act.SONG_BURGER_C, id })
  }

  return (
    <CardDiv isDragging={isDragging} onDoubleClick={playSong} >
      <div ref={ref}>{index + 1}</div>
      <div>
        <div>{text && text.artist}&nbsp;</div>
        <div>{text && text.title}&nbsp;</div>
      </div>
      {/* <div onClick={launchBurger(song_id)}>
        <img src={burgerIcon} />
      </div> */}
      <div ref={ref} onClick={launchBurger(song_id)}>
        {draggable ?
        <MdDragHandle style={{color:"gray", height:'24px', width:'24px'}}/>
        :
        <img src={burgerIcon} />
        }
      </div>
    </CardDiv>
  )
}
