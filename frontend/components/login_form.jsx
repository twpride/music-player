import { connect } from 'react-redux';
import React from 'react';
import { login } from '../actions/session_actions';
import { openModal, closeModal} from '../actions/modal_actions';
import './login_signup_form.css'
import {receiveErrors} from '../actions/session_actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  demoUser() {
    this.setState({
      ['email']: "demoUser@gmail.com",
      ['password']: "demouser",
    });
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
        <div className="login-form-container">
          <div className="modal-img">
            <img className="sign-in-logo"
              src="/static/svgs/pepper-medallion.svg" alt=""
            />
          </div>
          <h1 className="login-signup">SIGN IN</h1>

          <form onSubmit={this.handleSubmit} className="login-form-box">
            <div className="login-input">
              <div>Email</div>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
              />
            </div>            
            <div className="login-input">
              <div>Password</div>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
              />              
            </div>
            {this.renderErrors()}
            <input className="submit-button"
              type="submit"
              value={this.props.formType}
            />
          </form>
          <div className="seperator"></div>

          <div className="create-account">
            <div className="heading">NOT A MEMBER?</div>
            <div className="subheading">JOIN REWARDS. GET REWARDED.</div>
            <div className="button"
            onClick={() => this.props.openModal('signup')}
            >
              CREATE AN ACCOUNT
            </div>
            <br/>
            <div className="button"
            onClick={() => this.demoUser()}
            >
              FILL IN DEMO USER INFO
            </div>            
          </div>      
        </div>

        <div className="close-modal" onClick={() => this.props.closeModal()}>
          <img src="/static/svgs/dark-brown-x.png" alt="" />  
        </div>

      </div>
    );
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
    closeModal: ()=> dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
