import { useDispatch  } from 'react-redux';
import React, { useState, useRef } from 'react';
import { loginThunk } from '../actions/actions'
import {SessionDiv, renderErrors} from './signup_form'

export default function LoginForm({ setMode }) {
  const form = useRef(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginThunk(new FormData(form.current)))
  }

  return (
    <SessionDiv>
      <div className="title">Log in</div>
      <div className='spacer'></div>
      <form onSubmit={handleSubmit} className="login-form-box" id="loginForm" ref={form}>
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
          <input id='login' className="submit-button"
            type="submit" value='Log in'
          />
          <button onClick={() => setMode('')}>Back</button>
        </div>
      </form>
    </SessionDiv>
  );
}