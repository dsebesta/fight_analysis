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

    renderPastFights(fighter) {
        return fighter.records.map((record, index) => {
            return (
                    <TableRow key={index} selectable={false}>
                        <TableRowColumn colSpan="2">{record.date}</TableRowColumn>
                        <TableRowColumn colSpan="2">{record.name}</TableRowColumn>
                        <TableRowColumn colSpan="2">{record.opponent}</TableRowColumn>
                        <TableRowColumn>{record.result}</TableRowColumn>
                        <TableRowColumn colSpan="2">{record.method}</TableRowColumn>
                        <TableRowColumn>{record.round}</TableRowColumn>
                        <TableRowColumn>{record.time}</TableRowColumn>
                    </TableRow>
                )
        })
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
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan="7" tooltip={fighter_0.fighter_name} style={{textAlign: 'center'}}>
                                {fighter_0.fighter_name}
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2" tooltip="Event">Event</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Opponent">Opponent</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Result">Result</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Method">Method</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Round">Round</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Time">Time</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.renderPastFights(fighter_0)}
                    </TableBody>
                </Table>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan="7" tooltip={fighter_1.fighter_name} style={{textAlign: 'center'}}>
                                {fighter_1.fighter_name}
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Event">Event</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Opponent">Opponent</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Result">Result</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Method">Method</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Round">Round</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Time">Time</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.renderPastFights(fighter_1)}
                    </TableBody>
                </Table>
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