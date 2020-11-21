import React from 'react';
import styled from 'styled-components'

import NewPlaylist from './new_playlist';
import { useSelector } from 'react-redux'
import { modal_act } from '../reducers/ui_reducer'

const ModalDiv = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 25%;
  height: 50vh;
  width: 100vw;
  background-color: beige;
  z-index: 1;

  .field {
    text-transform: capitalize;
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