import React, {Component} from 'react';
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

class CommonOpponents extends Component {

    constructor(props) {
        super(props);

    }

    renderPastFights(fighter) {
        return fighter.records.map((record, index) => {

            let resultFormat;
            if (record.result === 'win') resultFormat = 'win-record';
            if (record.result === 'loss') resultFormat = 'loss-record';

            return (
                <TableRow key={index} style={tableStyle.row} className={resultFormat}>
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

        return (
            <div>
                <div>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow style={tableStyle.row}>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Date</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Opponent</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Round</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Method</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            {this.renderPastFights(activeTab)}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow style={tableStyle.row}>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Date</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Opponent</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Round</TableHeaderColumn>
                                <TableHeaderColumn style={tableStyle.columnHdr}>Method</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            {this.renderPastFights(activeTab)}
                        </TableBody>
                    </Table>
                </div>

            </div>
        )


    }
}

export default CommonOpponents;