import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchMatchup} from './../actions';
import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class Matchup extends Component {

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

    renderLevel1Stats(fighter) {
        return (
            <table className="table table-borderless">
                <tbody>
                <tr><td>{fighter.age}</td></tr>
                <tr><td>{fighter.height}</td></tr>
                <tr><td>{fighter.wins}</td></tr>
                <tr><td>{fighter.losses}</td></tr>
                <tr><td>{fighter.draw}</td></tr>
                <tr><td>{fighter.no_contest}</td></tr>
                <tr><td>Coming Soon</td></tr>
                <tr><td>Coming Soon</td></tr>
                <tr><td>Coming Soon</td></tr>
                </tbody>
            </table>
        )
    }


    renderLevel2Stats(fighter) {
        return (
            <table className="table table-borderless">
                <tbody>
                <tr><td>Coming Soon</td></tr>
                <tr><td>Coming Soon</td></tr>
                <tr><td>Coming Soon</td></tr>
                <tr><td>Coming Soon</td></tr>
                </tbody>
            </table>
        )
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

                <div className="matchup-header">
                    <div className="matchup-header-name">

                    </div>
                    <div className="matchup-header-name">
                        <h4>{fighter_0.fighter_name}</h4>
                    </div>
                    <div className="matchup-header-name">
                        <h4>{fighter_1.fighter_name}</h4>
                    </div>
                </div>

                <div>
                    <div className="matchup-left-column">
                        <table className="table table-borderless">
                            <tbody>
                            <tr><td className="text-right">Age</td></tr>
                            <tr><td className="text-right">Height</td></tr>
                            <tr><td className="text-right">Wins</td></tr>
                            <tr><td className="text-right">Losses</td></tr>
                            <tr><td className="text-right">Draws</td></tr>
                            <tr><td className="text-right">No Contest</td></tr>
                            <tr><td className="text-right">Current Streak</td></tr>
                            <tr><td className="text-right">Typically Wins By</td></tr>
                            <tr><td className="text-right">Typically Loses By</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="matchup-right-column">
                        <Paper zDepth={2}>
                            <div className="innerPaperContainer">
                                {this.renderLevel1Stats(fighter_0)}
                            </div>

                            <div className="innerPaperContainer">
                                {this.renderLevel1Stats(fighter_1)}
                            </div>
                        </Paper>
                    </div>
                </div>

                <div className="stat-container">
                    <div className="matchup-left-column">
                        <table className="table table-borderless">
                            <tbody>
                            <tr><td className="text-right">Days Since Last Fight</td></tr>
                            <tr><td className="text-right">MMA Career Length</td></tr>
                            <tr><td className="text-right">KO Losses</td></tr>
                            <tr><td className="text-right">Submission Losses</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="matchup-right-column">
                        <Paper zDepth={2}>
                            <div className="innerPaperContainer">
                                {this.renderLevel2Stats(fighter_0)}
                            </div>

                            <div className="innerPaperContainer">
                                {this.renderLevel2Stats(fighter_1)}
                            </div>
                        </Paper>
                    </div>
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