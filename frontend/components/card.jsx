import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import burgerIcon from '../icons/burger.svg'
import styled from 'styled-components'
const style = {
  border: '2px solid lightgrey',
  padding: '1',
  marginBottom: '0px',
  backgroundColor: 'white',
  cursor: 'move',
}


const CardDiv = styled.div`
  td {
    height: 4em;
    &:not(:nth-child(2)) {
      width:3em;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    &:nth-child(2) {
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
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))
  return (
    <CardDiv ref={ref} style={{ ...style, opacity }} onDoubleClick={playSong}>
      <td><div>{index + 1}</div></td>
      <td>
        <div>{text.artist}&nbsp;</div>
        <div>{text.title}&nbsp;</div>
      </td>
      <td>
        <div><img src={burgerIcon} /></div>
      </td>
    </CardDiv>
  )
}
