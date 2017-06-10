import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchEvent} from './../actions';

import Event from './Event';
import Matchup from './Matchup';

class EventHeader extends Component {

    componentWillMount() {
        const path = document.location.href;
        const pathIndex = path.indexOf('ufc');
        this.props.fetchEvent(path.substring(pathIndex+3, pathIndex+8));
    }

    handleTitleClick() {
        this.props.history.goBack();
    }

    render() {
        if (!this.props.event) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div>
                <div className="event-header">
                    <h3 onClick={this.handleTitleClick.bind(this)}>{this.props.event[0].title}</h3>
                </div>
                <div>
                    <Switch >
                        <Route exact path="/events/:id" component={Event} />
                        <Route exact path="/events/:id/:match" component={Matchup} />
                        <Route render={() => {
                            return <p>Not Found</p>
                        }}
                        />
                    </Switch>
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

export default connect(mapStateToProps, {fetchEvent}) (EventHeader);