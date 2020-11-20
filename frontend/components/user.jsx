import { connect } from 'react-redux';
import React from 'react';
import { modal_act } from '../reducers/ui_reducer'
import { session_act } from '../reducers/session_reducer';
import { logout } from '../util/session_api_util'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
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
          <div className="create-account">

            <div className="button"
              onClick={this.props.logout}
            >
              LOGOUT
          </div>
          </div>
        </div>
        <div className="close-modal" onClick={() => this.props.closeModal()}>
          X
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
    closeModal: () => dispatch({ type: modal_act.CLOSE_MODAL }),
    logout: async () => {
      await logout();
      dispatch({ type: session_act.LOGOUT_CURRENT_USER });
      dispatch({ type: modal_act.CLOSE_MODAL });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
