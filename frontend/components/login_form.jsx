import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { SIGNUP_M } from './modal'
import { receiveErrors, receiveCurrentUser } from '../actions/session_actions'

import { openModal, closeModal } from '../actions/ui_actions';
import { login } from "../util/session_api_util"
export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const openModals = modal => {
    dispatch(receiveErrors([]))
    dispatch(openModal(modal))
  };

  const closeModals = () => dispatch(closeModal())

  const errors = useSelector(state => state.errors.session)

  const demoUser = () => {
    setEmail("demoUser@gmail.com");
    setPassword("demouser");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById('loginForm'));

    const res = await login(form)
    if (res.ok) {
      const user = await res.json()
      dispatch(receiveCurrentUser(user))
      dispatch(closeModal())
    } else {
      const error = await res.json()
      dispatch(receiveErrors(error))
    }

  }

  const renderErrors = () => {
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
        <input className="submit-button"
          type="submit"
        />
      </form>

      <div className="create-account">
        <div className="heading">NOT A MEMBER?</div>
        <div className="button" onClick={() => openModals(SIGNUP_M)}>
          CREATE AN ACCOUNT
          </div>
        <div className="button" onClick={() => demoUser()}>
          FILL IN DEMO USER INFO
          </div>
      </div>


      <div className="close-modal" onClick={closeModals}>
        X
      </div>

    </>
  );
}