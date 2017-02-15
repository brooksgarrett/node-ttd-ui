import React from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import * as actions from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    errorMessage: state.errorMessage
  }
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      var {dispatch, store} = this.props;
    return (
        <div id="login">
            <p ref="login-form-error" className="error">{this.props.errorMessage}</p>
            <form id="login-form" onSubmit={(e) => {
                    e.preventDefault();
                    var {username, password} = this.refs;
                    if (username.value.length === 0 || password.value.length === 0) {
                        dispatch(actions.setErrorMessage('You must enter a username and password'));
                    } else {
                        
                            dispatch(actions.doLogin(username.value, password.value));
                        }

                    }
                }>
                <input type="text" ref="username" placeholder="Username"/>
                <input type="password" ref="password" placeholder="Password"/>
                <button>Submit</button>
            </form>
        </div>
    );
  }
}

export default connect(mapStateToProps)(Login);