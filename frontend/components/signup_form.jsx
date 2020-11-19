import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { signup, receiveErrors } from '../actions/session_actions';
import { modal_act } from '../reducers/ui_reducer'
import { useTextField } from './hooks'

export default function SignupForm() {
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors.session)

  const fields = {// dbname: print name
    email: 'Email',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Mobile Number'
  }

  function handleSubmit(e) {
    e.preventDefault();
    const sf = document.getElementById('signup-form')
    const user = new FormData(sf);
    dispatch(signup(user))
  }

  function renderErrors() {
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

  function login() {
    dispatch(receiveErrors([]))
    dispatch({type:modal_act.LOGIN_M})
  }

  return (
    <>
      <h1 className="login-signup">CREATE AN ACCOUNT</h1>
      <form onSubmit={handleSubmit} className="login-form-box" id="signup-form">

        {Object.entries(fields).map(
          (field, i) => ( // field = [dbname, print name]
            <div key={i} className="login-input">
              <div className="field">{field[1]}</div>
              <input type="text"
                {...useTextField(field[0])}
              />
            </div>
          )
        )}

        {renderErrors()}
        <input className="submit-button"
          type="submit"
        />
      </form>

      <div className="sign-in-redirect">
        <div className="heading">ALREADY A MEMBER?</div>
        <div className="link-to-sign-in" onClick={login}>SIGN IN</div>
      </div>

      <div className="close-modal" onClick={() => {
        dispatch({type:modal_act.CLOSE_MODAL})
      }}>
      </div>
    </>

  );
}

