import { connect } from 'react-redux';

import { logout, receiveErrors } from '../actions/session_actions';
import { openModal } from '../actions/modal_actions';

import React from 'react';

import Modal from './modal'
import './navbar.css'

const Navbar = ({ currentUser, closeModal, openModal }) => {

  return (
    <div className="nav">
      <div className="left-nav">
        <a href="" className="logo">
          <img src="/static/svgs/cmg-medallion-logo.svg" alt="" className="logo" />
        </a>
        <div className="user-button"
          onClick={() => { openModal(currentUser ? 'user' : 'login') }}>
          <img className="nav-logo" src="/static/svgs/user-outline.svg" alt="" />
          <div className="header-name">{currentUser ? `HEY ${currentUser.firstName}` : 'SIGN IN'}</div>
        </div>
      </div>

      <div className="pickup-button">
        <img className="location-logo" src="/static/svgs/edit_location-24px.svg" alt="" />
        <div className="sep"></div>
        <div>
          <div className='text'>PICKUP FROM</div>
          <div className='address'>516 Van Buren street, ridgewood</div>
        </div>
      </div>

      <div className="cart">
        <img className="nav-logo" src="/static/svgs/bag.svg" alt="" />
        <div className="cart-badge">7</div>
      </div>

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
