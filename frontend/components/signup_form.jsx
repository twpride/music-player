import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { signup } from '../util/session_api_util'
import { session_act } from '../reducers/session_reducer'

function renderErrors() {
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

export default function SignupForm({ setMode }) {
  const dispatch = useDispatch()

  const fields = {// dbname: print name
    email: 'Email',
    password: 'Password',
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const sf = document.getElementById('signup-form')
    const user = new FormData(sf);
    // dispatch(signup(user))

    const res = await signup(user)

    if (res.ok) {
      const currentUser = await res.json();
      dispatch({ type: session_act.RECEIVE_CURRENT_USER, currentUser })
    } else {
      const errors = await res.json();
      dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors })
    }

  }

  function login() {
    dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors: [] })
    setMode('login')
  }

  return (
    <>
      <h1 className="login-signup">CREATE AN ACCOUNT</h1>
      <form onSubmit={handleSubmit} className="login-form-box" id="signup-form">

        {Object.entries(fields).map(
          (field, i) => ( // field = [dbname, print name]
            <div key={i} className="login-input">
              <div className="field">{field[1]}</div>
              <input type="text" name={field[0]} />
            </div>
          )
        )}

        {renderErrors()}
        <input className="submit-button"
          type="submit" value='Sign up'
        />
      </form>

      <div className="sign-in-redirect">
        <div className="heading">ALREADY A MEMBER?</div>
        <div className="link-to-sign-in" onClick={login}>SIGN IN</div>
      </div>

      <button onClick={() => setMode('')}>BacK</button>
    </>

  );
}

