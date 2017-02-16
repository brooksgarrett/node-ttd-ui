import React from 'react'
import * as actions from '../actions/actions'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.user.token
  }
}

export class Toneset extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className="toneset" onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(actions.toggleSubscribe(this.props.token, this.props._id, this.props.subscribed))
                }}>
                <div>
                <input type="checkbox" checked={this.props.subscribed} />
                </div>
                <div>
                <p>{this.props.description}</p>
                <p className="toneset__subtext" >{this.props.toneID}</p>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Toneset);