import { useSelector, useDispatch } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import { signup } from '../util/session_api_util'
import { session_act } from '../reducers/session_reducer'
import styled from 'styled-components'

export function renderErrors() {
  const errors = useSelector(state => state.errors.session)
  return (
    <div className='error'>
      {errors.map((error, i) => (
        <div key={`error-${i}`} className="form-error">
          {error}
        </div>
      ))}
    </div>
  );
}

export const SessionDiv = styled.div`
  
  display:flex;
  flex-direction: column;

  .spacer {
    height:1em;
  }
  .splash-buttons-box {
    padding: 1em 0;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    .error {
      position: absolute;
      top: 3em; 
    }
  }

  .title {
    align-self:center;
    font-size:1.2em;
    font-weight:600;
  }

`

export default function SignupForm({ setMode }) {
  const dispatch = useDispatch()
  const form = useRef(null)
  const fields = {// dbname: print name
    email: 'Username',
    password: 'Password',
  }
  useEffect(() => {
    dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors: [] })
  }, [])
  async function handleSubmit(e) {
    e.preventDefault();
    const user = new FormData(form.current);
    const res = await signup(user)
    if (res.ok) {
      const currentUser = await res.json();
      dispatch({ type: session_act.RECEIVE_CURRENT_USER, currentUser })
    } else {
      const errors = await res.json();
      dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors })
    }

  }


  return (
    <SessionDiv>
      <div className="title">Sign up</div>
      <div className='spacer'></div>
      <form onSubmit={handleSubmit} ref={form} className="login-form-box" id="signup-form">

        {Object.entries(fields).map(
          (field, i) => ( // field = [dbname, print name]
            <div key={i} className="login-input">
              <div className="field">{field[1]}</div>
              <input type="text" name={field[0]} autoCorrect="off" autoCapitalize="none" />
            </div>
          )
        )}

        <div className='splash-buttons-box'>
          {renderErrors()}
          <input className="submit-button"
            type="submit" value='Submit'
          />
          <button onClick={() => setMode('')}>Back</button>
        </div>
      </form>

    </SessionDiv>

  );
}

