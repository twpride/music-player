import React from 'react';
import styled from 'styled-components'

import NewPlaylist from './new_playlist';
import { useSelector } from 'react-redux'
import { modal_act } from '../reducers/ui_reducer'

export const ModalDiv = styled.div`
  position: absolute;
  left: 1.5em;
  right: 1.5em;
  top: 10%;
  background-color: white;
  border: solid lightgrey 1px;
  z-index: 1;
  padding:1em;

  .title {
    font-size: 1em;
    font-weight: 600;
  }
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