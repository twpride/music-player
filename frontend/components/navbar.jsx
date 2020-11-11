import { connect } from 'react-redux';

import { logout, receiveErrors } from '../actions/session_actions';
import { openModal } from '../actions/modal_actions';
import {Link} from 'react-router-dom'

import React from 'react';

import Modal from './modal'
import './navbar.css'


const Navbar = ({ currentUser, closeModal, openModal }) => {
  const login = () => { openModal(currentUser ? 'user' : 'login') }
  return (
    <div className="nav">
      <Link to="/">
        Home
      </Link>
      <div className="user-button"
        onClick={login}>
        user 
      </div>

      <Link to="/upload">
        Upload
      </Link>

      <Link to="/playlist_d/">
        Playlists
      </Link>

      <Modal className="modalclass" />
    </div>
  )
};


const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => {
    dispatch(receiveErrors([]))
    dispatch(openModal(modal))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
