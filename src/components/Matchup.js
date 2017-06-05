import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchMatchup} from './../actions';
import GeneralStats from './GeneralStats';
import MindStats from './MindStats';
import BodyStats from './BodyStats';
import ComparisonStats from './ComparisonStats';

class Matchup extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const path = document.location.href;
        const pathIndexUFC = path.indexOf('ufc');
        const pathIndexSlash = path.lastIndexOf('/');
        const event_id = path.substring(pathIndexUFC+3, pathIndexSlash);
        const matchup_id = path.substring(pathIndexSlash+1);
        this.props.fetchMatchup(event_id, matchup_id);
    }

    setFighterInfo(id) {
        if (this.props.fighter.event_fighters[id]) {
            return this.props.fighter.event_fighters[id].fighter
        }
        return {
            fighter_name: 'Unknown Fighter'
        }
    }



    render() {

        if (!this.props.fighter) {
            return (
                <h3>Loading....</h3>
            )
        }

        const fighter_0 = this.setFighterInfo(0);
        const fighter_1 = this.setFighterInfo(1);

        return (
            <div className="matchup-container">
                <div className="matchup-left-col">
                    <span className="matchup-sections">General</span>
                </div>
                <div className="matchup-right-col">
                    <GeneralStats fighter_0={fighter_0} fighter_1={fighter_1} />
                </div>
                <div className="matchup-left-col">
                    <span className="matchup-sections">Mind</span>
                </div>
                <div className="matchup-right-col">
                    <MindStats fighter_0={fighter_0} fighter_1={fighter_1} />
                </div>
                <div className="matchup-left-col">
                    <span className="matchup-sections">Body</span>
                </div>
                <div className="matchup-right-col">
                    <BodyStats fighter_0={fighter_0} fighter_1={fighter_1} />
                </div>
                <div className="matchup-left-col">
                    <span className="matchup-sections">Comparison</span>
                </div>
                <div className="matchup-right-col">
                    <ComparisonStats fighter_0={fighter_0} fighter_1={fighter_1} />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        fighter: state.fighterProps.matchup
    }
}

export default connect(mapStateToProps, {fetchMatchup}) (Matchup);