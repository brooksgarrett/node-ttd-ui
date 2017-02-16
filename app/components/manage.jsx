import React from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import * as actions from '../actions/actions';
import TonesetList from './tonesetlist';

const mapStateToProps = (state, ownProps) => {
  return {
    errorMessage: state.errorMessage
  }
}

export class Manage extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
      return (
        <div id="manage">
            <p ref="manage-form-error" className="error">{this.props.errorMessage}</p>
            <TonesetList />
        </div>
      )
  }
}

export default connect(mapStateToProps)(Manage);