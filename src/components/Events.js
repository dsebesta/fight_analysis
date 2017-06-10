import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchEventsAll} from './../actions';
import Nav from './Nav';

class Events extends Component {

    componentWillMount() {
        this.props.fetchEventsAll();
    }

    handleClick(route) {
        this.props.history.push(route)
    }

    renderEvents() {
        return this.props.events.map((event, index) => {
            const route = '/events/ufc' + (event.event_id);
            const event_date = event.event_date.split('-');
            const venue = event.venue.split(', ');

            if (event.event_fighters[0]) {
                return (
                    <tr onTouchTap={this.handleClick.bind(this, route)} key={index}>
                        <td data-header="Date">{event_date[1] + ' / ' + event_date[2] + ' / ' + event_date[0]}</td>
                        <td data-header="Title">{event.title}</td>
                        <td data-header="Venue">{venue[0]}</td>
                    </tr>
                )
            }
            else {
                return null;
            }


        });
    }


    render() {

        if (!this.props.events) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div>
                <Nav />
                <div className="events-container">
                    <table className="events-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Location</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderEvents()}
                        </tbody>
                    </table>
                </div>
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