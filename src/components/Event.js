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
        const {fights} = this.props.event;
        for (var key in fights) {
            console.log(key + ' ' , fights[key])
        }
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
                <div>
                    {this.renderMatchups()}
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