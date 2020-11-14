import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
const style = {
  border: '2px solid lightgrey',
  padding: '1',
  marginBottom: '0px',
  backgroundColor: 'white',
  cursor: 'move',
}
export const Card = ({ id, text, index, moveCard, setPrev }) => {
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
    begin() { setStart(index) },
    end() {
      console.log(start)
      console.log(index)
      setPrev(start, index)
    }
  })
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      {text ? text.title : "false"}
    </div>
  )
}
