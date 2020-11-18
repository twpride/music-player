import { connect } from 'react-redux';
import React from 'react';
import { login } from '../actions/session_actions';
import { openModal, closeModal} from '../actions/ui_actions';
// import './login_signup_form.css'
import {receiveErrors, logout} from '../actions/session_actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
  }

  renderErrors() {
    return (
      <>
        {this.props.errors.map((error, i) => (
          <div key={`error-${i}`} className="form-error">
            {error}
          </div>
        ))}
      </>
    );
  }

  render() {
    return (
    <div className="modal">
      <div className = "login-form-container">
        <div className = "create-account">

          <div className="button"
              onClick={() => this.props.logout()}
          >
            LOGOUT
          </div>
        </div>
      </div>
      <div className="close-modal" onClick={() => this.props.closeModal()}>
        <img src="/static/svgs/dark-brown-x.png" alt="" />  
      </div>
    </div>
    )    
  }
}

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'SIGN IN',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    openModal: modal => {
      dispatch(receiveErrors([]))
      dispatch(openModal(modal))
    },
    closeModal: ()=> dispatch(closeModal()),
    logout: ()=> dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
