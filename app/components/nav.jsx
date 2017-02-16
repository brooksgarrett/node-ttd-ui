import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import * as actions from '../actions/actions'

class Nav extends React.Component { 
    constructor (props) {
        super(props);
    }
    userNavBar () { 
        var {dispatch, username, token} = this.props;
        return (
            <ul className="menu">
            <li className="menu-text">TTDApp</li>
                <li><Link to="/manage" activeClassName="active-link">Manage</Link></li>
                <li><Link to="/dispatches" activeClassName="active-link">Dispatches</Link></li>
                <li><Link activeClassName="active-link" onClick={() => {
                    dispatch(actions.doLogout(token));
                }}>Logout</Link></li>
            </ul>
        )
    }
    anonNavBar () {
        return (
            <ul className="menu">
                <li className="menu-text">TTDApp</li>
                <li><Link to="/login" activeClassName="active-link">Login</Link></li>
                <li><Link to="/register" activeClassName="active-link">Register</Link></li>
            </ul>
        )
    }
    render () {
        var navLinks = null;
        if (this.props.loggedIn) {
            navLinks = this.userNavBar();
        } else {
            navLinks = this.anonNavBar();
        }

        return (
        <div className="top-bar">
            <div className="top-bar-left">
                {this.props.loggedIn ? (
                    this.userNavBar()
                ) : (
                    this.anonNavBar()
                )}
            </div>
            <div className="top-bar-right">
                <ul className="menu">
                <li className="menu-text">Created by <a href="https://github.com/brooksgarrett/">Brooks Garrett</a></li>
                </ul>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    token: state.user.token
  }
}

export default connect(mapStateToProps)(Nav);
