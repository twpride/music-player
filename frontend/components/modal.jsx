import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import User from './user';

function Modal({modal}) {
  if (!modal) {
    return null;
  }
  let Component;
  switch (modal) {
    case 'login':
      Component = LoginForm;
      break;
    case 'signup':
      Component = SignupForm;
      break;
    case 'user':
      Component = User;
      break;
    default:
      return null;
  }
  return <Component className="modalclass"/>

}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};


export default connect(mapStateToProps)(Modal);
