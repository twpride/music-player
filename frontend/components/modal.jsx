import React from 'react';
import styled from 'styled-components'

import NewPlaylist from './new_playlist';
import { useSelector } from 'react-redux'
import { modal_act } from '../reducers/ui_reducer'

export const ModalDiv = styled.div`
  position: absolute;
  height: 100%;
  width:100%;
  z-index: 20;
  padding:1em;
  background-color: rgba(0,0,0,0.5)

  /* .title {
    font-size: 1em;
    font-weight: 600;
  } */
`
export default function Modal() {
  const modal = useSelector(state => state.ui.modal);
  if (!modal) {
    return null;
  }
  let Component;
  switch (modal.type) {
    case modal_act.NEW_PLAYLIST:
      Component = NewPlaylist;
      break;
    default:
      return null;
  }
  return <ModalDiv><Component /></ModalDiv>
}