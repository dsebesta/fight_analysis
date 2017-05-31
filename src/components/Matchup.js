import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchMatchup} from './../actions';

class Matchup extends Component {

    componentWillMount() {
        const path = document.location.href;
        const pathIndexUFC = path.indexOf('ufc');
        const pathIndexSlash = path.lastIndexOf('/');
        const event_id = path.substring(pathIndexUFC+3, pathIndexSlash);
        const matchup_id = path.substring(pathIndexSlash+1);
        this.props.fetchMatchup(event_id, matchup_id);
    }


    render() {
        return (
            <div>
                <h1>Event Matchup</h1>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        event: state.eventProps.event
    }
}

export default connect(mapStateToProps, {fetchMatchup}) (Matchup);