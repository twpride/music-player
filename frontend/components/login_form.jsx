import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { login } from '../actions/session_actions';
import './login_signup_form.css'
import { receiveErrors, receiveCurrentUser } from '../actions/session_actions'

import { openModal, closeModal } from '../actions/modal_actions';

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const openModals = modal => {
    dispatch(receiveErrors([]))
    dispatch(openModal(modal))
  };

  const closeModals = () => dispatch(closeModal())

  const { errors, formType } = useSelector(({ errors }) => ({
    errors: errors.session,
    formType: 'SIGN IN',
  }));

  const demoUser = () => {
    setEmail("demoUser@gmail.com");
    setPassword("demouser");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById('loginForm'));
    dispatch(login(form))
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
    <div className="modal" >
      <div className="login-form-container">
        <div className="modal-img">
          image?!
        </div>
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
        <div className="seperator"></div>

        <div className="create-account">
          <div className="heading">NOT A MEMBER?</div>
          <div className="subheading">JOIN REWARDS. GET REWARDED.</div>
          <div className="button"
            onClick={() => openModals('signup')}
          >
            CREATE AN ACCOUNT
          </div>
          <br />
          <div className="button"
            onClick={() => demoUser()}
          >
            FILL IN DEMO USER INFO
          </div>
        </div>
      </div>

      <div className="close-modal" onClick={closeModals}>
        X
      </div>

    </div >
  );
}