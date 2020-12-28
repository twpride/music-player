import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';

import { ent_act, context_act, session_act } from '../reducers/root_reducer'

import {LogoutIcon} from "./active_svgs"
import { BurgerDiv } from './contextMenu'
import UploadForm from './upload_form'
import { logout } from '../util/session_api_util'

export default function Account() {

  const dispatch = useDispatch();
  const session = useSelector(state => state.session)

  const burgerList = {
    "Log out": {
      icon: LogoutIcon,
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
            <div key={i} onClick={Comp.cb} className="row">
              <LogoutIcon {...{scale:1, size:"24px"}}/>
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