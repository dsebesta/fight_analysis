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
                <tr key={index}>
                    <td className="text-right"> <Link to={route}>{fNames[0]} </Link></td>
                    <td className="text-center"> vs. </td>
                    <td> <Link to={route}>{fNames[1]} </Link></td>
                </tr>
            )
        })
    }

    render() {

        if (!this.props.event) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div className="home-container">
                <h1>{this.props.event[0].title}</h1>
                <div>
                    <table className="table table-striped">
                        <tbody className="table-hover">
                            {this.renderMatchups()}
                        </tbody>
                    </table>
                </div>
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