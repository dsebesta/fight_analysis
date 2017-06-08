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

    renderCommonFighter0() {
        const opponentObject = this.props.common_opponents;
        const opponentKeys = Object.keys(this.props.common_opponents);

        return opponentKeys.map((opponent) => {
            return opponentObject[opponent].map((fight, index) => {
                const fight0 = fight[0];
                let resultFormat;
                if (fight0.result === 'win') resultFormat = 'win-record';
                if (fight0.result === 'loss') resultFormat = 'loss-record';
                return (
                    <TableRow key={index} style={tableStyle.row} className={resultFormat}>
                        <TableRowColumn style={tableStyle.column}> {fight0.date} </TableRowColumn>
                        <TableRowColumn style={tableStyle.column}> {fight0.opponent} </TableRowColumn>
                        <TableRowColumn style={tableStyle.column}> {fight0.round} </TableRowColumn>
                        <TableRowColumn style={tableStyle.column}> {fight0.method} </TableRowColumn>
                    </TableRow>
                )
            })
        })
    }

    renderCommonFighter1() {
        const opponentObject = this.props.common_opponents;
        const opponentKeys = Object.keys(this.props.common_opponents);

        return opponentKeys.map((opponent) => {
            return opponentObject[opponent].map((fight, index) => {
                const fight1 = fight[1];
                let resultFormat;
                if (fight1.result === 'win') resultFormat = 'win-record';
                if (fight1.result === 'loss') resultFormat = 'loss-record';
                return (
                    <TableRow key={index} style={tableStyle.row} className={resultFormat}>
                        <TableRowColumn style={tableStyle.column}> {fight1.date} </TableRowColumn>
                        <TableRowColumn style={tableStyle.column}> {fight1.opponent} </TableRowColumn>
                        <TableRowColumn style={tableStyle.column}> {fight1.round} </TableRowColumn>
                        <TableRowColumn style={tableStyle.column}> {fight1.method} </TableRowColumn>
                    </TableRow>
                )
            })
        })
    }



    render() {

        return (
            <div className="common-container">
                <div className="common-section-left">
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
                            {this.renderCommonFighter0()}
                        </TableBody>
                    </Table>
                </div>
                <div className="common-section-right">
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
                            {this.renderCommonFighter1()}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )


    }
}

export default CommonOpponents;