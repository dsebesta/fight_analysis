import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchEventsAll} from './../actions';
import {Link} from 'react-router-dom';

class Events extends Component {

    componentWillMount() {
        this.props.fetchEventsAll();
    }

    renderEvents() {
        return this.props.events.map((event, index) => {
            // const route = '/events/ufc' + (event.event_id * 1.337);
            const route = '/events/ufc' + (event.event_id);

            return (
                <tr key={index}>

                    <td> {event.event_date} </td>

                    <td>
                        <Link to={route}>
                            {event.title}
                        </Link>
                    </td>

                    <td> {event.venue} </td>

                </tr>
            )
        });
    }

    render() {

        if (!this.props.events) {
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
        events: state.eventProps.events
    }
}

export default connect(mapStateToProps, {fetchEventsAll}) (Events);