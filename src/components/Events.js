import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchEventsAll} from './../actions';

class Events extends Component {

    componentWillMount() {
        this.props.fetchEventsAll();
    }

    renderEvents() {
        return this.props.eventData.map((event, index) => {
            return (
                <tr key={index}>
                    <td> {event.event_date} </td>
                    <td> {event.title} </td>
                    <td> {event.venue} </td>
                </tr>
            )
        });
    }

    render() {

        if (!this.props.eventData) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div className="home-container">
                <h1>Events</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {this.renderEvents()}
                    </tbody>
                </table>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        eventData: state.events
    }
}

export default connect(mapStateToProps, {fetchEventsAll}) (Events);