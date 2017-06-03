import React from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const tableStyle = {
    column: {
        textAlign: "center",
        height: "20px"
    },
    columnHdr: {
        textAlign: "right",
        height: "25px"
    },
    row: {
        height: "20px"
    }
};

const MindStats = (props) => {
    return (
        <Table>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Days Since Last Fight</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.days_last_fight}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.days_last_fight}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Days Since Last Win</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.days_last_win}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.days_last_win}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Days Since Last Loss</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.days_last_loss}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.days_last_loss}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Coming Off a Loss</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.off_loss}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.off_loss}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>UFC Fight Experience</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ufc_fights}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ufc_fights}</TableRowColumn>
                </TableRow>

            </TableBody>
        </Table>
    )
};

export default MindStats;