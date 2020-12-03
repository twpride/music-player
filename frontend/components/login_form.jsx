import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useRef } from 'react';

import { session_act } from '../reducers/session_reducer'
// import { login } from "../util/session_api_util" //option await
import { loginThunk } from '../actions/actions' //option thunk (more portable)
import {SessionDiv, renderErrors} from './signup_form'


export default function LoginForm({ setMode }) {
  const form = useRef(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function signUp() {
    dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors: [] })
    setMode('signup')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginThunk(new FormData(form.current))) // option thunk

    // // option await
    // const res = await login(form)
    // if (res.ok) {
    //   const currentUser = await res.json()
    //   dispatch({type:session_act.RECEIVE_CURRENT_USER, currentUser})
    //   dispatch({type:modal_act.CLOSE_MODAL})
    // } else {
    //   const errors = await res.json()
    //   dispatch({type:session_act.RECEIVE_SESSION_ERRORS, errors})
    // }

  }


  return (
    <SessionDiv>
      <div className="title">Log in</div>
      <div className='spacer'></div>
      <form onSubmit={handleSubmit} className="login-form-box" id="loginForm">
        <div className="login-input">
          <div>Email</div>
          <input type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
          />
        </div>
        <div className="login-input">
          <div>Password</div>
          <input type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
          />
        </div>
        <div className='splash-buttons-box'>
          {renderErrors()}
          <button onClick={() => setMode('')}>Back</button>
          <input id='login' className="submit-button"
            type="submit" value='Log in'
          />
        </div>
      </form>

      {/* <button onClick={signUp}>
          Create an account
        </button> */}
    </SessionDiv>
  );
}