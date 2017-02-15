import React from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import * as actions from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    errorMessage: state.errorMessage
  }
}

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      var {dispatch, store} = this.props;
    return (
        <div id="register">
            <p ref="register-error" className="error">{this.props.errorMessage}</p>
            <form id="register-form" onSubmit={(e) => {
                    e.preventDefault();
                    var {username, password, passwordConfirm, phone} = this.refs;
                    if (username.value.length === 0 || password.value.length === 0) {
                        console.log('ERR: You must enter a username and password');
                        dispatch(actions.setErrorMessage('You must enter a username and password'));
                    } else if (password.value !== passwordConfirm.value) {
                        dispatch(actions.setErrorMessage('Password and Confirm Password must match'));
                    } else {
                        dispatch(actions.doRegister(username.value, password.value, phone.value));
                    }
                }}>
                <input type="text" ref="username" placeholder="EMail Address"/>
                <input type="tel" ref="phone" placeholder="Phone number 555-555-5555"/>
                <input type="password" ref="password" placeholder="Password"/>
                <input type="password" ref="passwordConfirm" placeholder="Password (Again)"/>
                <button>Submit</button>
            </form>
        </div>
    );
  }
}

export default connect(mapStateToProps)(Register);