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
      <div>
          <Nav />
          <div className="columns medium-6 large-4 small-centered">
            {this.props.children}
          </div>
      </div>
    );
  }
}

export default connect()(TTDApp);