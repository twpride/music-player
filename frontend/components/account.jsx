import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';

import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import { session_act } from '../reducers/session_reducer';

import logOutIcon from '../icons/logout.svg'
import { BurgerDiv } from './contextMenu'
import UploadForm from './upload_form'
import { logout } from '../util/session_api_util'

export default function Account() {

  const dispatch = useDispatch();
  const session = useSelector(state => state.session)

  const burgerList = {
    "Log out": {
      icon: logOutIcon,
      cb(e) {
        logout().then(
          () => {
            dispatch({ type: ent_act.SET_PAUSE })
            dispatch({ type: ent_act.LOAD_TRACK, track: null })
            dispatch({ type: ent_act.RECEIVE_SONG_URL, url: "" })
            dispatch({ type: context_act.CLOSE_CONTEXT })
            dispatch({ type: session_act.LOGOUT_CURRENT_USER })
          }
        )
      }
    },

    "Upload Songs": UploadForm
  }

  // console.log(UploadForm)
  // console.log(burgerList["Log out"])
  // console.log(typeof (icons[0]))

  return (
    <BurgerDiv 
    onClick={(e) => e.stopPropagation()}
    >
      <div className='context-header'>
        <div>{session && session.currentUser.email}</div>
      </div>
      {Object.entries(burgerList).map(
        ([name, Comp], i) => (
          typeof Comp === 'object'
            ?
            <div key={i} onClick={Comp.cb} className="burger-row">
              <img src={Comp.icon} />
              <div className="burger-text">
                {name}
              </div>
            </div>
            :
            <Comp key={i}/>
        )
      )}
    </BurgerDiv>
  );
}