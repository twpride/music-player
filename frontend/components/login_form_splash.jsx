import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

import { session_act } from '../reducers/session_reducer'
import { modal_act } from '../reducers/ui_reducer'
// import { login } from "../util/session_api_util" //option await
import { loginThunk } from '../actions/actions' //option thunk (more portable)

const renderErrors = () => {
  const errors = useSelector(state => state.errors.session)
  return (
    <>
      {errors.map((error, i) => (
        <div key={`error-${i}`} className="form-error">
          {error}
        </div>
      ))}
    </>
  );
}

export default function LoginForm({ setMode }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function signUp() {
    dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors: [] })
    setMode('signup')
  };

  const closeModals = () => dispatch({ type: modal_act.CLOSE_MODAL })


  const demoUser = async () => {
    await new Promise((res) => {
      setEmail("demo1@demo.com");
      setPassword("demodemo");
      res()
    })
    const form = new FormData(document.getElementById('loginForm'));
    dispatch(loginThunk(form)) // option thunk
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById('loginForm'));

    dispatch(loginThunk(form)) // option thunk

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
    <>
      <h1 className="login-signup">SIGN IN</h1>

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
        {renderErrors()}
        <input id='login' className="submit-button"
          type="submit"
        />
      </form>

      <div className="create-account">
        <div className="heading">NOT A MEMBER?</div>
        <div className="button" onClick={signUp}>
          CREATE AN ACCOUNT
          </div>
        <div className="button" id='demo' onClick={() => demoUser()}>
          FILL IN DEMO USER INFO
          </div>
      </div>
      <button onClick={() => setMode('')}>BacK</button>

    </>
  );
}