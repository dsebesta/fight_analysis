import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchEvent} from './../actions';
import {Link} from 'react-router-dom';

class Events extends Component {

    componentWillMount() {
        const path = document.location.href;
        const pathIndex = path.indexOf('ufc');
        this.props.fetchEvent(path.substring(pathIndex+3));
    }



    renderMatchups() {
        const {event} = this.props;
        return event.map((fight, index) => {

            const fNames = fight.fighter_name.split(',');
            const route = '/events/ufc' + fight.event_id + '/' + fight.match_id;

            return (
                <tr key={index} onTouchTap={this.handleClick.bind(this, route)}>
                    <td> {fNames[0]} </td>
                    <td> vs. </td>
                    <td> {fNames[1]} </td>
                </tr>
            )
        })
    }

    handleClick(route) {
        this.props.history.push(route)
    }

    render() {

        if (!this.props.event) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div className="event-container">
                <table className="event-table">
                    <tbody>
                        {this.renderMatchups()}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        event: state.eventProps.event
    }
}

export default connect(mapStateToProps, {fetchEvent}) (Events);