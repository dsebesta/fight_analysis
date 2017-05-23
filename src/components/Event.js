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



    render() {

        if (!this.props.event) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div className="home-container">
                <h1>{this.props.event.title}</h1>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        event: state.events
    }
}

export default connect(mapStateToProps, {fetchEvent}) (Events);