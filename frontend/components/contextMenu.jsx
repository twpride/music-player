import React from 'react';
import styled from 'styled-components'
import SongEditForm from './song_edit_form';
import SongBurger from './song_burger';
import {useSelector} from 'react-redux'
 


import {context_act} from '../reducers/ui_reducer'


const ModalDiv = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: beige;
  z-index: 1;

  .field {
    text-transform: capitalize;
  }
`

export default function ContextMenu() {
  const contextMenu = useSelector(state => state.ui.contextMenu);
  if (!contextMenu) {
    return null;
  }
  let Component;
  switch (contextMenu.type) {
    case context_act.SONG_BURGER_C:
      Component = SongBurger;
      break;
    case context_act.SONG_EDIT_C:
      Component = SongEditForm;
      break;
    default:
      return null;
  }
  return <ModalDiv><Component id={contextMenu.id} /></ModalDiv>
}