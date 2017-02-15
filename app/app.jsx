var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var {Provider} = require('react-redux');

import TTDApp from './components/ttdapp';
import Login from './components/login';
import Register from './components/register';
import Manage from './components/manage';
import * as actions from './actions/actions';

var store = require('./store/configureStore').configure();

// App CSS
require('style!css!sass!ApplicationStyles');

store.subscribe(() => {
    var state = store.getState();
});

// Check if we have a token
if (localStorage.getItem('jwt-token')) {
    store.dispatch(actions.loadToken(localStorage.getItem('jwt-token')));
}

$(document).foundation();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={TTDApp}>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register} />
                <Route path="/manage" component={Manage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
