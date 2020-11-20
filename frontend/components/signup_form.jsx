import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useTextField } from '../util/hooks'
import { signup } from '../util/session_api_util'
import { modal_act } from '../reducers/ui_reducer'
import { session_act } from '../reducers/session_reducer'

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

  async function handleSubmit(e) {
    e.preventDefault();
    const sf = document.getElementById('signup-form')
    const user = new FormData(sf);
    // dispatch(signup(user))

    const res = await signup(user)

    if (res.ok) {
      const currentUser = await res.json()
      dispatch({ type: session_act.RECEIVE_CURRENT_USER, currentUser })
      dispatch({ type: modal_act.CLOSE_MODAL })
    } else {
      const errors = await res.json()
      dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors })
    }


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
    dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors: [] })
    dispatch({ type: modal_act.LOGIN_M })
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
        dispatch({ type: modal_act.CLOSE_MODAL })
      }}>
      </div>
    </>

  );
}

