var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var {Provider} = require('react-redux');

import TTDApp from './components/ttdapp';
import Login from './components/login';
import Register from './components/register';

var store = require('./store/configureStore').configure();

// App CSS
require('style!css!sass!ApplicationStyles');

store.subscribe(() => {
    var state = store.getState();
});

$(document).foundation();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={TTDApp}>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
