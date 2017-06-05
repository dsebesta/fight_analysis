import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchFighter} from './../actions';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const tableStyle = {
    column: {
        textAlign: "center",
        height: "20px"
    },
    columnHdr: {
        textAlign: "center",
        height: "25px"
    },
    row: {
        height: "20px"
    }
};

class Fighter extends Component {

    componentWillMount() {
        const path = document.location.href;
        const pathIndex = path.lastIndexOf('/');
        this.props.fetchFighter(path.substring(pathIndex+1));
    }

    renderPastFights() {
        return this.props.fighter.records.map((record, index) => {
            return (
                <TableRow key={index} style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.column}> {record.date} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.opponent} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.round} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.time} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.result} </TableRowColumn>
                    <TableRowColumn style={tableStyle.column}> {record.method} </TableRowColumn>
                </TableRow>
                )
        })
    }


    render() {

        if (!this.props.fighter) {
            console.log('props not loaded yet');
            return (
                <h3>Loading....</h3>
            )
        }

        const {fighter} = this.props;

        return (
            <div className="home-container">
                <h1 className="text-center">{fighter.fighter_name}</h1>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow style={tableStyle.row}>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Date</TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Opponent</TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Round</TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Time</TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Result</TableHeaderColumn>
                            <TableHeaderColumn style={tableStyle.columnHdr}>Method</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {this.renderPastFights()}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fighter: state.fighterProps.fighter
    }
}

export default connect(mapStateToProps, {fetchFighter}) (Fighter);