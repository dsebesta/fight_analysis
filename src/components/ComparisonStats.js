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

const ComparisonStats = (props) => {

    props.fighter_0.ip = 'In Progress';
    props.fighter_1.ip = 'In Progress';

    return (
        <Table>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>at Similar Elevation</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>vs Similar Height Opponents</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>vs Similar Reach Opponents</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>vs Same Opponents</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Typically Wins By</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
                <TableRow style={tableStyle.row}>
                    <TableRowColumn style={tableStyle.columnHdr}>Typically Loses By</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_0.ip}</TableRowColumn>
                    <TableRowColumn style={tableStyle.column}>{props.fighter_1.ip}</TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>
    )
};

export default ComparisonStats;