import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchFighter} from './../actions';

class Events extends Component {

    componentWillMount() {
        const path = document.location.href;
        const pathIndex = path.lastIndexOf('/');
        this.props.fetchFighter(path.substring(pathIndex+1));
    }


    render() {

        if (!this.props.fighter) {
            return (
                <h3>Loading....</h3>
            )
        }

        return (
            <div className="home-container">
                <h1>Fighter</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fighter: state.fighterProps
    }
}

export default connect(mapStateToProps, {fetchFighter}) (Events);