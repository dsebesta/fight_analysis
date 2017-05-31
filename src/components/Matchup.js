import React, {Component} from 'react';
import { connect } from 'react-redux';

class Matchup extends Component {

    componentWillMount() {

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

export default connect(mapStateToProps) (Matchup);