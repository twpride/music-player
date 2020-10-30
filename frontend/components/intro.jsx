import { connect } from 'react-redux';


import React, { useState, useReducer } from 'react';

import './intro.css'

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';




const Intro = ({ logout, openModal, menu }) => {
  const useLegacyState = initialState => useReducer(
    (state, update) => ({ ...state, ...update }),
    initialState
  );

  const initState = {
    title: "hello",
    artist: "this",
    album: "is a test",
    waveform: null
  };

  const [state, setState] = useLegacyState(initState);

  const update = field => e => setState({
    [field]: e.currentTarget.value
  });

  window.yyy = state
  const uploadSongs = e => {
    let reader = new FileReader();
    const music = e.currentTarget.files[0]

    reader.onload = e => {
      const audioEle = document.createElement('audio');
      audioEle.src = e.target.result
      window.xxx = audioEle.src
    };

    if (music) {
      reader.readAsDataURL(music)
    }
  }


  return (
    <div className="login-form-container">
      <input type="file" onChange={uploadSongs}></input>
      <div className="modal-img">
        <img className="sign-in-logo"
          src="/static/svgs/pepper-medallion.svg" alt=""
        />
      </div>
      <h1 className="login-signup">CREATE AN ACCOUNT</h1>

      <form onSubmit={update('')} className="login-form-box">
        <div className="login-input">
          <div>Title</div>
          <input type="text"
            value={state.title}
            onChange={update('title')}
          />
        </div>
        <div className="login-input">
          <div>Artist</div>
          <input type="text"
            value={state.artist}
            onChange={update('artist')}
          />
        </div>
        <div className="login-input">
          <div>Album</div>
          <input type="text"
            value={state.album}
            onChange={update('album')}
          />
        </div>
        {/* {this.renderErrors()} */}
        <input className="submit-button"
          type="submit"
        // value={this.props.formType}
        />
      </form>

      <div className="sign-in-redirect">
        <div className="heading">ALREADY A MEMBER?</div>
        <div className="link-to-sign-in"
        // onClick={() => this.props.openModal('login')}
        >SIGN IN</div>
      </div>

    </div>
  )
};

const mapStateToProps = ({ entities }) => ({
  // currentUser: session.currentUser
  menu: entities.menu
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(
  mapStateToProps,
  null
)(Intro);
















