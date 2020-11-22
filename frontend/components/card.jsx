import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import burgerIcon from '../icons/burger.svg'
import styled from 'styled-components'

const CardDiv = styled.div`
  font-size: .9em;
  font-family: Sans-Serif;
  display:flex;
  flex-direction:row;
  align-items: center;
  max-width: 100%;
  >div {
    height: 4em;
    opacity: ${props=>props.isDragging ? 0.4 : 1};

    &:not(:nth-child(2)) {
      min-width:3em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &:nth-child(2) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width:22.5em;
      div {
        overflow:hidden;
        white-space: nowrap;
        &:nth-child(1) {
          color: #606060;
        }
      }
    }
  }
`


export const Card = ({ id, text, index, moveCard, setPrev, playSong, song_id, prev }) => {
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
      console.log(start)
      console.log(index)
      setPrev(start, index)
    }
  })

  drag(drop(ref))

  return (
    <CardDiv ref={ref} isDragging={isDragging} onDoubleClick={playSong}>
      <div>{index + 1}</div>
      <div>
        <div>{text && text.artist}&nbsp;</div>
        <div>{text && text.title}&nbsp;</div>
      </div>
      <div>
        <img src={burgerIcon} />
      </div>
    </CardDiv>
  )
}
