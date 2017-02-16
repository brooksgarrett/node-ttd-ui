import React from 'react'
import Toneset from './toneset'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    tonesets: state.tonesets,
    subscriptions: state.user.subscriptions
  }
}

export class TonesetList extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        var renderTonesets = () => {
            var {tonesets} = this.props;
            var subscriptions = this.props.subscriptions;

            return tonesets.map((toneset) => {
                var subscribed = false;
                var filtered = subscriptions.filter((subscription) => subscription._toneset === toneset._id )
                if (filtered.length > 0) {
                    subscribed = true;
                }
                return (
                    <Toneset key={toneset._id} {...toneset} />
                )
            });
        }
        return (
            <div className="toneset-list">
                {renderTonesets()}
            </div>
        )
    }
}

export default connect(mapStateToProps)(TonesetList);