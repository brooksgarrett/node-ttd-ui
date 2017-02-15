import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'

class Nav extends React.Component { 
    constructor (props) {
        super(props);
    }
    userNavBar () { 
        var {dispatch, username} = this.props;
        return (
        <div>
            <ul>
                <li>{username}</li>
                <li><Link to="/manage">Manage</Link></li>
                <li><Link to="/dispatches">Dispatches</Link></li>
                <li><Link to="/" onClick={() => {
                    dispatch(actions.logout());
                }}>Logout</Link></li>
            </ul>
        </div>
        )
    }
    anonNavBar () {
        return (
        <div>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </div>
        )
    }
    render () {
        if (this.props.loggedIn) {
            return this.userNavBar();
        } else {
            return this.anonNavBar();
        }
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.user.loggedIn,
    username: state.user.username
  }
}

export default connect(mapStateToProps)(Nav);
