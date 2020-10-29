import { connect } from 'react-redux';
import React from 'react';
import { signup, receiveErrors} from '../actions/session_actions';
import { openModal, closeModal } from '../actions/modal_actions';
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
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
    this.props.processForm(user);
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
          <h1 className="login-signup">CREATE AN ACCOUNT</h1>

          <form onSubmit={this.handleSubmit} className="login-form-box">
            <div className="login-input">
              <div>Email</div>
              <input type="text"
                value={this.state.username}
                onChange={this.update('email')}
              />
            </div>
            <div className="login-input">
              <div>Password</div>
              <input type="text"
                value={this.state.password}
                onChange={this.update('password')}
              />
            </div>
            <div className="login-input">
              <div>First Name</div>
              <input type="text"
                value={this.state.firstName}
                onChange={this.update('firstName')}
              />
            </div>
            <div className="login-input">
              <div>Last Name</div>
              <input type="text"
                value={this.state.lastName}
                onChange={this.update('lastName')}
              />
            </div>
            <div className="login-input">
              <div>Mobile Number</div>
              <input type="text"
                value={this.state.phoneNumber}
                onChange={this.update('phoneNumber')}
              />
            </div>
            {this.renderErrors()}
            <input className="submit-button"
              type="submit"
              value={this.props.formType}
            />
          </form>

          <div className="sign-in-redirect">
            <div className="heading">ALREADY A MEMBER?</div>
            <div className="link-to-sign-in"
              onClick={() => this.props.openModal('login')}
            >SIGN IN</div>
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
    formType: 'CREATE AN ACCOUNT'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => {
      dispatch(signup(user))
    },
    openModal: modal => {
      dispatch(receiveErrors([]))
      dispatch(openModal(modal))
    },
    closeModal: ()=> dispatch(closeModal())
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);



