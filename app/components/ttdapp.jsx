import React from 'react';
import {Link, hashHistory} from 'react-router';
import {connect} from 'react-redux'
import Nav from './nav'

export class TTDApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="column small-centered small-11 medium-6 large-5">
          <h1>TTDApp</h1>
          <Nav />
          <div className="container">
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default connect()(TTDApp);